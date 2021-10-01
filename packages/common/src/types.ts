/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, FC } from 'react';
import { Logger as TSLogLogger } from 'tslog';

export type Logger = TSLogLogger;

export type RediagramConfig = {
  filepath: string | null;
  output: Readonly<{
    dir?: string;
    format: string;
  }>;
  options: {
    [name: string]: Record<string, unknown>;
  };
  scope: Readonly<{
    includes: ReadonlyArray<string>;
    excludes: ReadonlyArray<string>;
  }>;
  // dot: Readonly<{
  //   timeout: number;
  // }>;
};

export interface ExportOption {
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
  format?: string;
}

export type RediagramRootComponent<P = {}> = FC<P> & {
  renderer: string;
};
export type RRC<P = {}> = RediagramRootComponent<P>;

export interface RediagramRenderer {
  (element: ReactElement): Promise<string>;
}

export interface RediagramExporter {
  (svg: string, option: Required<ExportOption>): Promise<string>;
}

// TODO
export interface RediagramPlugin {
  renderers?: {
    [name: string]: RediagramRenderer;
  };
  exporters?: {
    [name: string]: RediagramExporter;
  };
}

export interface RediagramPluginContext<T extends {} = {}> {
  logger: Logger;
  option: T;
}

export interface RediagramPluginModule<T extends {} = {}> {
  name: string;
  setup(context: RediagramPluginContext<T>): RediagramPlugin;
}

export interface RediagramPluginManager {
  create<T>(name: string, context: RediagramPluginContext, option: T): RediagramPlugin;
}

export interface RediagramCore {
  config: Readonly<RediagramConfig>;
  logger: Logger;
  render(element: ReactElement, options: ExportOption): Promise<string>;
  export(svg: string, options: ExportOption): Promise<string>;
  process(element: ReactElement<any, RediagramRootComponent>, options: ExportOption): Promise<string>;
  run(src: string): Promise<void>;
}
