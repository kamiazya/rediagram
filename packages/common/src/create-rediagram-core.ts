import { RediagramCore } from './types';
import { Core } from './core';
import { ROOT_LOGGER } from './root-logger';
import { loadConfig } from './load-config';

const MODULE_NAME = 'rediagram';

/**
 * Load the config file and create an instance of RediagramCore.
 */
export function createRediagramCore(): RediagramCore {
  const logger = ROOT_LOGGER.getChildLogger({ name: MODULE_NAME });
  const config = loadConfig(MODULE_NAME);
  return new Core(config, logger);
}
