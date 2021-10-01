import { RediagramCore } from './types';
import { Core } from './core';
import { ROOT_LOGGER } from './root-logger';
import { loadConfig } from './load-config';
import { PluginManager } from './plugin-manager';
import { DotPluginModule } from './plugins/dot-plugin';
import { ImagePluginModule } from './plugins/image-plugin';

const MODULE_NAME = 'rediagram';

/**
 * Load the config file and create an instance of RediagramCore.
 */
export function createRediagramCore(): RediagramCore {
  const logger = ROOT_LOGGER.getChildLogger({ name: MODULE_NAME });
  const config = loadConfig(MODULE_NAME);
  const plugins = PluginManager.createWithPresetModules(logger.getChildLogger({ name: 'rediagram/PluginManager' }), [
    DotPluginModule,
    ImagePluginModule,
  ]);
  plugins.init(DotPluginModule.name, config.options.dot);
  plugins.init(ImagePluginModule.name);

  const core = new Core(config, logger, plugins);
  return core;
}
