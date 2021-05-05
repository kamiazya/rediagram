/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from 'path';
import Ajv from 'ajv';
import { ReactElement } from 'react';
import {
  PreprocessResult,
  RediagramCore,
  RediagramExportFunction,
  RediagramLogger,
  RediagramPluginAggregation,
  RediagramPluginModule,
  RediagramPostprocesser,
  RediagramPreprocessFunction,
  RediagramRenderFunction,
  RediagramRootComponent,
} from './types';

export class PluginAggregation implements RediagramPluginAggregation {
  private static assertsPluginModule(obj: any): asserts obj is RediagramPluginModule {
    if (typeof obj.name !== 'string') {
      throw new Error('name is reqired');
    }
    if (obj.name.length === 0) {
      throw new Error('name must be more then 1 charactor');
    }
    if (typeof obj.create !== 'function') {
      throw new Error('create function is reqired');
    }
  }

  private resolved = new Map<string, RediagramPluginModule<any>>();

  private readonly logger: RediagramLogger;

  constructor(loggder: RediagramLogger) {
    this.logger = loggder;
  }

  private resolvePlugin(name: string): RediagramPluginModule<any> {
    let pluginModule = this.resolved.get(name);
    if (pluginModule) {
      return pluginModule;
    }
    let m: any;
    try {
      // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require
      m = require(name);
    } catch {
      const moduleFilePath = path.resolve(process.cwd(), name);
      // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require
      m = require(moduleFilePath);
    }
    pluginModule = m.default ?? m;
    PluginAggregation.assertsPluginModule(pluginModule);
    this.resolved.set(name, pluginModule);
    return pluginModule;
  }

  public loadPlugin<T>(name: string, option: T, core: RediagramCore): void {
    const pluginModule = this.resolvePlugin(name);
    this.logger.debug(`Plugin "${pluginModule.name}" loaded.`);
    if (pluginModule.optionSchema) {
      const validate = new Ajv().compile(pluginModule.optionSchema);
      validate(option);
    }
    const plugin = pluginModule.create(option, {
      logger: this.logger.createChild(pluginModule.name),
      core,
    });
    if (plugin.renderers) {
      Object.entries(plugin.renderers).forEach(([rendererName, renderer]) => {
        this.renderer.set(rendererName, renderer);
      });
    }
    if (plugin.exporters) {
      Object.entries(plugin.exporters).forEach(([format, exporter]) => {
        this.exporter.set(format, exporter);
      });
    }
    if (plugin.preprocessors) {
      Object.entries(plugin.preprocessors).forEach(([ext, preprocessor]) => {
        this.preprocessor.set(ext, preprocessor);
      });
    }
    if (plugin.postprocessors) {
      this.postprocessors.push(...plugin.postprocessors);
    }
  }

  private renderer = new Map<string, RediagramRenderFunction>();

  private exporter = new Map<string, RediagramExportFunction>();

  private preprocessor = new Map<string, RediagramPreprocessFunction>();

  private postprocessors: RediagramPostprocesser[] = [];

  public getRenderFunction(element: ReactElement<any, RediagramRootComponent>): RediagramRenderFunction {
    const render = this.renderer.get(element.type.renderer);
    if (!render) {
      throw new Error('renderer not found.');
    }
    return render;
  }

  public getExportFunction(format: string): RediagramExportFunction {
    const exporter = this.exporter.get(format);
    if (!exporter) {
      throw new Error('exporter not found.');
    }
    return exporter;
  }

  public async process(filepath: string): Promise<void> {
    const { ext } = path.parse(filepath);
    const preprocess = this.getPreprocessorFunction(ext.slice(1));
    const result = preprocess(filepath);
    this.postprocess(result);
  }

  private getPreprocessorFunction(ext: string): RediagramPreprocessFunction {
    const preprocessor = this.preprocessor.get(ext);
    if (!preprocessor) {
      throw new Error('preprocessor not found.');
    }
    return preprocessor;
  }

  private postprocess(result: PreprocessResult): void {
    if (result) {
      // eslint-disable-next-line no-restricted-syntax
      const postprocessor = this.postprocessors.find((p) => p.match(result));
      if (postprocessor) {
        postprocessor.postprocess(result);
      }
    }
  }
}
