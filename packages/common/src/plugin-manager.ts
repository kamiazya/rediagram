import {
  Logger,
  RediagramExporter,
  RediagramPlugin,
  RediagramPluginModule,
  RediagramRenderer,
  RediagramTransformer,
} from './types';

export class PluginManager {
  private static assertsPluginModule(obj: any): asserts obj is RediagramPluginModule {
    if (typeof obj.name !== 'string') {
      throw new Error('name is reqired');
    }
    if (obj.name.length === 0) {
      throw new Error('name must be more then 1 charactor');
    }
    if (typeof obj.setup !== 'function') {
      throw new Error('setup function is reqired');
    }
  }

  public static createWithPresetModules(logger: Logger, pluginModules: RediagramPluginModule[]): PluginManager {
    const plugins = new PluginManager(logger);
    pluginModules.forEach((pluginModule) => {
      plugins.loadPreset(pluginModule);
    });
    return plugins;
  }

  private preloads = new Map<string, RediagramPluginModule>();

  private transformers = new Map<string, RediagramTransformer>();

  private renderers = new Map<string, RediagramRenderer>();

  private exporters = new Map<string, RediagramExporter>();

  constructor(private readonly logger: Logger) {}

  public loadPreset(pluginModule: RediagramPluginModule): void {
    this.logger.debug(`"${pluginModule.name}" seted to preloads`);
    this.preloads.set(pluginModule.name, pluginModule);
  }

  private async importPlugin(nameOrKey: string): Promise<RediagramPluginModule> {
    let pluginModule = this.preloads.get(nameOrKey);
    if (pluginModule) {
      return pluginModule;
    }
    pluginModule = await import(nameOrKey);
    PluginManager.assertsPluginModule(pluginModule);
    return pluginModule;
  }

  public async createPlugin<T>(name: string, option: T): Promise<RediagramPlugin> {
    const pluginModule = await this.importPlugin(name);
    return pluginModule.setup({ option: option ?? {}, logger: this.logger.getChildLogger({ name }) });
  }

  public async init(name: string, option?: Record<string, unknown>): Promise<void> {
    this.load(await this.createPlugin(name, option));
  }

  public load(plugin: RediagramPlugin): void {
    if (plugin.renderers) {
      Object.entries(plugin.renderers).forEach(([name, renderer]) => {
        this.logger.debug(`"${name}" seted to renderers`);
        this.renderers.set(name, renderer);
      });
    }

    if (plugin.exporters) {
      Object.entries(plugin.exporters).forEach(([name, exporter]) => {
        this.logger.debug(`"${name}" seted to exporters`);
        this.exporters.set(name, exporter);
      });
    }

    if (plugin.transformers) {
      Object.entries(plugin.transformers).forEach(([name, transformer]) => {
        this.logger.debug(`"${name}" seted to transformers`);
        this.transformers.set(name, transformer);
      });
    }
  }

  public getRenderer(name: string): RediagramRenderer {
    const func = this.renderers.get(name);
    if (!func) {
      throw new Error(`"${name}" renderer not found.`);
    }
    return func;
  }

  public getExporter(name: string): RediagramExporter {
    const exporter = this.exporters.get(name);
    if (!exporter) {
      throw new Error(`"${name}" exporter not found.`);
    }
    return exporter;
  }

  public getTransformers(): IterableIterator<[string, RediagramTransformer]> {
    return this.transformers.entries();
  }
}
