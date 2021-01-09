/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, FC } from 'react';
import { JSONSchemaType } from 'ajv';
import { RediagramCoreOption } from '../config';

export interface RediagramLogger {
  getChildLogger(settings: { name: string }): RediagramLogger;
  /**
   * Logs a silly message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  silly(...args: unknown[]): void;
  /**
   * Logs a trace message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  trace(...args: unknown[]): void;
  /**
   * Logs a debug message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  debug(...args: unknown[]): void;
  /**
   * Logs an info message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  info(...args: unknown[]): void;
  /**
   * Logs a warn message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  warn(...args: unknown[]): void;
  /**
   * Logs an error message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  error(...args: unknown[]): void;
  /**
   * Logs a fatal message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  fatal(...args: unknown[]): void;
}

export type RediagramRootComponent<P = {}> = FC<P> & {
  renderer: string;
};

export type RRC<P = {}> = RediagramRootComponent<P>;

export interface RediagramPluginContext {
  logger: RediagramLogger;
}

export interface RediagramRenderFunction {
  (element: ReactElement): Promise<Buffer>;
}

export interface RediagramExportFunction {
  (svgString: string, output: string): Promise<void>;
}

export interface RediagramPreprocessFunction {
  (filepath: string): void;
}

export interface RediagramPlugin {
  preprocessor?: {
    [ext: string]: RediagramPreprocessFunction;
  };
  renderer?: {
    [name: string]: RediagramRenderFunction;
  };
  exporter?: {
    [format: string]: RediagramExportFunction;
  };
}

export interface RediagramPluginModule<T extends {} = {}> {
  name: string;
  optionSchema?: JSONSchemaType<T>;
  create(option: T, context: RediagramPluginContext): RediagramPlugin;
}

export interface RediagramPluginManager {
  loadPreset(pluginModule: RediagramPluginModule<any>): void;
  loadPlugin<T>(name: string, option: T): void;
  getRenderFunction(element: ReactElement<any, RediagramRootComponent>): RediagramRenderFunction;
  getExportFunction(format: string): RediagramExportFunction;
  getPreprocessorFunction(ext: string): RediagramPreprocessFunction;
}

export interface RediagramCore {
  config: Readonly<RediagramCoreOption>;
  logger: RediagramLogger;
  pluginManager: RediagramPluginManager;
  loadPlugin<T>(name: string, options?: T): void;
  render(
    element: ReactElement<any, RediagramRootComponent>,
    output: { name: string; format?: string; dir?: string },
  ): Promise<void>;
  process(filepath: string): void;
}
