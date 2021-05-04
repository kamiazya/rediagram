/* eslint-disable @typescript-eslint/no-namespace */
import path from 'path';
import { RediagramConfig } from './types';

export namespace beta1 {
  export const version = 'beta1';

  interface Config {
    version: typeof version;
    includes?: string[];
    excludes?: string[];
    output?: {
      dir?: string;
      type?: string;
    };
    plugins?: {
      name: string;
      [option: string]: any;
    }[];
    dot?: {
      timeout?: number;
    };
  }

  export function load(filepath: string, data: Config): RediagramConfig {
    return {
      core: {
        filepath,
        output: {
          dir: path.resolve(path.dirname(filepath), data.output?.dir ?? '.'),
          format: data.output?.type ?? 'png',
        },
        scope: {
          includes: data.includes ?? ['**/*.rediagram.{jsx,tsx}'],
          excludes: data.excludes ?? ['**/node_modules/**/*'],
        },
        plugins: (data.plugins ?? []).map(({ name, ...options }) => ({ name, options })),
      },
      dot: {
        timeout: data.dot?.timeout,
      },
    };
  }
}
