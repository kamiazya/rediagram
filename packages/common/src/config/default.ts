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
      plugins: [
        {
          name: '@rediagram/plugin-dot',
        },
        {
          name: '@rediagram/plugin-sharp',
        },
        {
          name: '@rediagram/plugin-sucrase',
        },
      ],
    },
  };
}
