/* eslint-disable class-methods-use-this */
import { ReactElement } from 'react';
import path from 'path';
import { ensureDir } from 'fs-extra';
import { Logger } from 'tslog';
import { loadConfig, RediagramCoreOption } from '../config';
import {
  RediagramCore,
  RediagramRootComponent,
  RediagramLogger,
  RediagramPluginManager,
  RediagramPluginModule,
} from './types';
import { PluginManager } from './plugin';

import { DotPluginModule } from '../plugins/dot';
import { ImagePluginModule } from '../plugins/image';
import { SucrasePluginModule } from '../plugins/sucrase';

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
      const logger = new Logger({
        type: 'pretty',
        name: 'rediagram',
        displayDateTime: false,
        displayFilePath: 'hidden',
        displayFunctionName: false,
      });

      const pm = new PluginManager(logger.getChildLogger({ name: 'plugin-manager' }), ...this.presetPluginModules);

      const instance = new Core(logger, core, pm);

      this.presetPluginModules.forEach(({ name }) => instance.loadPlugin(name, pluginOptions[name]));

      core.plugins.forEach(({ name, options }) => instance.loadPlugin(name, options));

      this.instance = instance;
    }
    return this.instance;
  }

  constructor(
    public logger: RediagramLogger,
    public readonly config: Readonly<RediagramCoreOption>,
    public readonly pluginManager: RediagramPluginManager,
  ) {
    if (this.config.filepath) {
      logger.debug(`Config loaded from "./${path.relative(process.cwd(), this.config.filepath)}".`);
    } else {
      logger.debug('Config file not found.');
    }
  }

  public async render(
    element: ReactElement<any, RediagramRootComponent>,
    output: { name: string; format: string; dir?: string },
  ): Promise<void> {
    const render = this.pluginManager.getRenderFunction(element);
    const exporter = this.pluginManager.getExportFunction(output.format);
    if (output.dir !== undefined) {
      await ensureDir(output.dir);
    }
    const filePath = path.format({
      dir: output.dir,
      name: output.name,
      ext: `.${output.format}`,
    });

    const buffer = await render(element);
    await exporter(buffer.toString('utf8'), filePath);
  }

  public loadPlugin(name: string, option: any = {}): void {
    this.pluginManager.loadPlugin(name, option);
  }

  get process(): (filepath: string) => void {
    return (filepath: string) => {
      const { ext } = path.parse(filepath);
      const preprocess = this.pluginManager.getPreprocessorFunction(ext.slice(1));
      preprocess(filepath);
    };
  }
}
