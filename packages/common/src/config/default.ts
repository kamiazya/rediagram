import { RediagramConfig } from './types';

export function createDefaultConfig(): RediagramConfig {
  return {
    core: {
      filepath: null,
      scope: {
        includes: ['**/*.rediagram.{jsx,tsx}'],
        excludes: ['**/node_modules/**/*'],
      },
      output: {
        format: 'png',
      },
      plugins: [],
    },
    dot: {},
  };
}
