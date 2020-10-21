/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
import { Beta1 } from './version';

export class OutputConfig {
  constructor(private readonly data?: { dir?: string }) {}

  public getDir(): string {
    return this.data?.dir ?? process.cwd();
  }
}

export class ScopeConfig {
  constructor(private readonly data?: { includes?: string[]; excludes?: string[] }) {}

  public getIncludesPattarns(): string[] {
    return this.data?.includes ?? ['**/*.rediagram.{jsx,tsx}'];
  }

  public getExcludesPattarns(): string[] {
    return this.data?.excludes ?? ['**/node_modules/**/*'];
  }
}

export class DotConfig {
  constructor(private readonly data?: { timeout?: number }) {}

  public getTimeout(): number {
    return this.data?.timeout ?? 10_000;
  }
}

export type RediagramGlobalConfig = {
  readonly filepath: string | null;
  readonly output: OutputConfig;
  readonly scope: ScopeConfig;
  readonly dot: DotConfig;
};

const MODULE_NAME = 'rediagram';

function createDefaultConfig(): RediagramGlobalConfig {
  return {
    filepath: null,
    scope: new ScopeConfig(),
    output: new OutputConfig(),
    dot: new DotConfig(),
  };
}

namespace beta1 {
  type Plugin = {
    name: string;
    [key: string]: any;
  };
  type Config = {
    version: Beta1;
    plugins?: (Plugin | string)[];
    includes?: string[];
    excludes?: string[];
    output?: {
      dir?: string;
    };
    dot?: {
      timeout?: number;
    };
  };

  export function load(filepath: string, data: Config): RediagramGlobalConfig {
    return {
      filepath,
      output: new OutputConfig({
        dir: path.resolve(path.dirname(filepath), data.output?.dir ?? '.'),
      }),
      scope: new ScopeConfig({
        includes: data.includes,
        excludes: data.excludes,
      }),
      dot: new DotConfig({
        timeout: data.dot?.timeout,
      }),
    };
  }
}

function loadConfig(): RediagramGlobalConfig {
  const { search } = cosmiconfigSync(MODULE_NAME);
  const result = search();
  if (result !== null) {
    if (result.config.version === 'beta1') {
      return beta1.load(result.filepath, result.config);
    }
  }
  return createDefaultConfig();
}

export const CONFIG = loadConfig();
