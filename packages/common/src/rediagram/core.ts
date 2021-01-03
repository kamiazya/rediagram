/* eslint-disable class-methods-use-this */
import { ReactElement } from 'react';
import path from 'path';
import { ensureDir } from 'fs-extra';
import { Logger } from 'tslog';
import { loadConfig, RediagramCoreOption } from '../config';
import { RediagramCore, RediagramTask, RediagramRootComponent, RediagramLogger, RediagramPluginManager } from './types';
import { DotPluginModule } from '../plugins/dot';
import { PluginManager } from './plugin';
import { ImagePluginModule } from '../plugins/image';
import { SucrasePluginModule } from '../plugins/sucrase';

export class Core implements RediagramCore {
  public static readonly MODULE_NAME = 'rediagram';

  private static instance?: RediagramCore;

  public static create(): RediagramCore {
    if (!this.instance) {
      const { core: config, dot: dotPluginOption } = loadConfig();
      const logger = new Logger({
        type: 'pretty',
        name: 'rediagram',
        displayDateTime: false,
        displayFilePath: 'hidden',
        displayFunctionName: false,
      });
      const pluginManager = new PluginManager(DotPluginModule, ImagePluginModule, SucrasePluginModule);
      this.instance = new Core(logger, config, pluginManager);
      this.instance.loadPlugin(DotPluginModule.name, dotPluginOption);
      this.instance.loadPlugin(ImagePluginModule.name);
      this.instance.loadPlugin(SucrasePluginModule.name);
    }
    return this.instance;
  }

  constructor(
    public logger: RediagramLogger,
    public readonly config: Readonly<RediagramCoreOption>,
    public readonly pluginManager: RediagramPluginManager,
  ) {
    if (this.config.filepath) {
      logger.info(`Config loaded from "./${path.relative(process.cwd(), this.config.filepath)}".`);
    } else {
      logger.info('Config file not found.');
    }
  }

  private async render(
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public loadPlugin(name: string, option: any = {}): void {
    const context = { logger: this.logger.getChildLogger({ name }), config: Object.freeze(this.config) };
    const plugin = this.pluginManager.createPlugin(name, context, option);
    this.pluginManager.load(plugin);
  }

  public async register(task: RediagramTask): Promise<void> {
    try {
      const dir = task.output?.dir ?? this.config.output.dir;
      const format = task.output?.format ?? this.config.output.format;
      const { name } = task;
      await this.render(task.diagram, { dir, name, format });
    } catch (error) {
      this.logger.error(error);
    }
  }

  get process(): (filepath: string) => void {
    return (filepath: string) => {
      const { ext } = path.parse(filepath);
      const preprocess = this.pluginManager.getPreprocessorFunction(ext.slice(1));
      preprocess(filepath);
    };
  }
}
