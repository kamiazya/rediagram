import { Logger, RediagramExporter, RediagramPlugin, RediagramPluginModule, RediagramRenderer } from './types';

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

  private renderers = new Map<string, RediagramRenderer>();

  private exporters = new Map<string, RediagramExporter>();

  constructor(private readonly logger: Logger) {}

  public loadPreset(pluginModule: RediagramPluginModule): void {
    this.logger.debug(`"${pluginModule.name}" seted to preloads`);
    this.preloads.set(pluginModule.name, pluginModule);
  }

  private resolvePlugin(nameOrKey: string): RediagramPluginModule {
    let pluginModule = this.preloads.get(nameOrKey);
    if (pluginModule) {
      return pluginModule;
    }
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require
    pluginModule = require(nameOrKey);
    PluginManager.assertsPluginModule(pluginModule);
    return pluginModule;
  }

  public createPlugin<T>(name: string, option: T): RediagramPlugin {
    const pluginModule = this.resolvePlugin(name);
    return pluginModule.setup({ option: option ?? {}, logger: this.logger.getChildLogger({ name }) });
  }

  public init(name: string, option?: Record<string, unknown>): void {
    this.load(this.createPlugin(name, option));
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
}
