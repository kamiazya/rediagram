import { cosmiconfigSync } from 'cosmiconfig';
import { RediagramConfig } from './types';
import { beta1 } from './beta1';
import { createDefaultConfig } from './default';

const MODULE_NAME = 'rediagram';

export function loadConfig(): RediagramConfig {
  const { search } = cosmiconfigSync(MODULE_NAME);
  const result = search();
  switch (result?.config.version) {
    case beta1.version:
      return beta1.load(result.filepath, result.config);
    default:
      return createDefaultConfig();
  }
}
