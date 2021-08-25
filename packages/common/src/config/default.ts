import { RediagramConfig } from '../types';

export function createDefaultConfig(): RediagramConfig {
  return {
    filepath: null,
    scope: {
      includes: ['**/*.rediagram.{jsx,tsx}'],
      excludes: ['**/node_modules/**/*'],
    },
    output: {
      format: 'png',
    },
    dot: {
      timeout: 10_000,
    },
  };
}
