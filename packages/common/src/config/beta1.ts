/* eslint-disable @typescript-eslint/no-namespace */
import path from 'node:path';
import { Format } from '@ts-graphviz/node';
import { RediagramConfig } from '../types';

export namespace beta1 {
  export const version = 'beta1';

  interface Config {
    version: typeof version;
    includes?: string[];
    excludes?: string[];
    output?: {
      dir?: string;
      type?: Format;
    };
    dot?: {
      timeout?: number;
    };
    plugins?: { name: string; [key: string]: unknown }[];
  }

  export function load(filepath: string, data: Config): RediagramConfig {
    return {
      filepath,
      output: {
        dir: path.resolve(path.dirname(filepath), data.output?.dir ?? '.'),
        format: data.output?.type ?? 'png',
      },
      options: {
        dot: data.dot ?? {},
      },
      scope: {
        includes: data.includes ?? ['**/*.rediagram.{jsx,tsx}'],
        excludes: data.excludes ?? ['**/node_modules/**/*'],
      },
      // dot: {
      //   timeout: data.dot?.timeout ?? 10_000,
      // },
    };
  }
}
