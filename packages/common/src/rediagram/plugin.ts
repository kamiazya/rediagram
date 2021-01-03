/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Ajv from 'ajv';
import { ReactElement } from 'react';
import {
  RediagramExportFunction,
  RediagramPlugin,
  RediagramPluginContext,
  RediagramPluginManager,
  RediagramPluginModule,
  RediagramPreprocessFunction,
  RediagramRenderFunction,
  RediagramRootComponent,
} from './types';

export class PluginManager implements RediagramPluginManager {
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

  private preloads = new Map<string, RediagramPluginModule<any>>();

  constructor(...pluginModules: RediagramPluginModule<any>[]) {
    pluginModules.forEach((pluginModule) => {
      this.loadPreset(pluginModule);
    });
  }

  public loadPreset(pluginModule: RediagramPluginModule<any>): void {
    this.preloads.set(pluginModule.name, pluginModule);
  }

  private resolvePlugin(nameOrKey: string): RediagramPluginModule<any> {
    let pluginModule = this.preloads.get(nameOrKey);
    if (pluginModule) {
      return pluginModule;
    }
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require
    pluginModule = require(nameOrKey);
    PluginManager.assertsPluginModule(pluginModule);
    return pluginModule;
  }

  public createPlugin<T>(name: string, context: RediagramPluginContext, option: T): RediagramPlugin {
    const pluginModule = this.resolvePlugin(name);
    if (pluginModule.optionSchema) {
      const validate = new Ajv().compile(pluginModule.optionSchema);
      validate(option);
    }
    return pluginModule.create(option, context);
  }

  private renderer = new Map<string, RediagramRenderFunction>();

  private exporter = new Map<string, RediagramExportFunction>();

  private preprocessor = new Map<string, RediagramPreprocessFunction>();

  public load(plugin: RediagramPlugin): void {
    if (plugin.renderer) {
      Object.entries(plugin.renderer).forEach(([rendererName, renderer]) => {
        this.renderer.set(rendererName, renderer);
      });
    }
    if (plugin.exporter) {
      Object.entries(plugin.exporter).forEach(([format, exporter]) => {
        this.exporter.set(format, exporter);
      });
    }
    if (plugin.preprocessor) {
      Object.entries(plugin.preprocessor).forEach(([ext, preprocessor]) => {
        this.preprocessor.set(ext, preprocessor);
      });
    }
  }

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

  public getPreprocessorFunction(ext: string): RediagramPreprocessFunction {
    const preprocessor = this.preprocessor.get(ext);
    if (!preprocessor) {
      throw new Error('preprocessor not found.');
    }
    return preprocessor;
  }
}
