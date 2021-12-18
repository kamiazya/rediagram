import { RediagramConfig } from '../types';

export function createDefaultConfig(): RediagramConfig {
  return {
    filepath: null,
    output: {
      format: 'png',
    },
    options: {},
    scope: {
      includes: ['**/*.rediagram.{jsx,tsx}'],
      excludes: ['**/node_modules/**/*'],
    },
    // dot: {
    //   timeout: 10_000,
    // },
  };
}
