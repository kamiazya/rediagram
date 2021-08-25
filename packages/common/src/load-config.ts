import { cosmiconfigSync } from 'cosmiconfig';
import { RediagramConfig } from './types';
import { beta1 } from './config/beta1';
import { createDefaultConfig } from './config/default';

export function loadConfig(name: string): RediagramConfig {
  const { search } = cosmiconfigSync(name);
  const result = search();
  switch (result?.config.version) {
    case beta1.version:
      return beta1.load(result.filepath, result.config);
    default:
      return createDefaultConfig();
  }
}
