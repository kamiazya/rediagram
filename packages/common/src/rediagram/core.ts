/* eslint-disable class-methods-use-this */
import { ReactElement } from 'react';
import path from 'path';
import { ensureDir } from 'fs-extra';
import { loadConfig, RediagramCoreOption } from '../config';
import {
  RediagramCore,
  RediagramRootComponent,
  RediagramLogger,
  RediagramPluginAggregation,
  RediagramPluginModule,
} from './types';
import { PluginAggregation } from './plugin-aggregation';

import { DotPluginModule } from '../plugins/dot';
import { ImagePluginModule } from '../plugins/image';
import { SucrasePluginModule } from '../plugins/sucrase';
import { DefaultLogger } from './logger';

export class Core implements RediagramCore {
  public static readonly MODULE_NAME = 'rediagram';

  public static presetPluginModules: RediagramPluginModule<any>[] = [
    DotPluginModule,
    ImagePluginModule,
    SucrasePluginModule,
  ];

  private static instance?: RediagramCore;

  public static create(): RediagramCore {
    if (!this.instance) {
      const { core, pluginOptions = {} } = loadConfig();
      const logger = DefaultLogger.createRoot();

      const aggregation = new PluginAggregation(logger.createChild('plugin-aggregation'), ...this.presetPluginModules);

      if (core.filepath) {
        logger.debug(`Config loaded from "./${path.relative(process.cwd(), core.filepath)}".`);
      } else {
        logger.debug('Config file not found.');
      }
      const instance = new Core(logger, core, aggregation);

      this.presetPluginModules.forEach(({ name }) => instance.loadPlugin(name, pluginOptions[name]));

      core.plugins.forEach(({ name, options }) => instance.loadPlugin(name, options));

      this.instance = instance;
    }
    return this.instance;
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(
    public logger: RediagramLogger,
    public readonly config: Readonly<RediagramCoreOption>,
    public readonly aggregation: RediagramPluginAggregation,
  ) {}

  public async render(
    element: ReactElement<any, RediagramRootComponent>,
    output: { name: string; format?: string; dir?: string },
  ): Promise<void> {
    const format = output.format ?? this.config.output.format;
    const render = this.aggregation.getRenderFunction(element);
    const exporter = this.aggregation.getExportFunction(format);
    if (output.dir !== undefined) {
      await ensureDir(output.dir);
    }
    const filePath = path.format({
      dir: output.dir,
      name: output.name,
      ext: `.${format}`,
    });

    const buffer = await render(element);
    await exporter(buffer.toString('utf8'), filePath);
  }

  public loadPlugin(name: string, option: any = {}): void {
    this.aggregation.loadPlugin(name, option, this);
  }

  get process(): (filepath: string) => Promise<void> {
    return (filepath: string): Promise<void> => this.aggregation.process(filepath);
  }
}
