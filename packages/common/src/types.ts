import { ReactElement } from 'react';
import { Format } from '@ts-graphviz/node';
import { Logger as TSLogLogger } from 'tslog';

export type Logger = TSLogLogger;

export type RediagramConfig = {
  filepath: string | null;
  scope: Readonly<{
    includes: ReadonlyArray<string>;
    excludes: ReadonlyArray<string>;
  }>;
  output: Readonly<{
    dir?: string;
    format: Format;
  }>;
  dot: Readonly<{
    timeout: number;
  }>;
};

export interface RediagramPluginContext {
  logger: Logger;
  config: RediagramConfig;
}

export type RenderOption = {
  /**
   * Output destination directory.
   */
  dir?: string;
  /**
   * Output file name.
   */
  name: string;
  /**
   * Output file format.
   */
  format?: Format;
};

export interface RediagramCore {
  config: Readonly<RediagramConfig>;
  logger: Logger;
  render(element: ReactElement, options: RenderOption): Promise<string>;
  run(src: string): Promise<void>;
}
