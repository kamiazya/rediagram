export interface RediagramCoreOption {
  filepath: string | null;
  scope: Readonly<{
    includes: ReadonlyArray<string>;
    excludes: ReadonlyArray<string>;
  }>;
  output: Readonly<{
    dir?: string;
    format: string;
  }>;
}

export interface RediagramDotPluginOption {
  timeout?: number;
}

export interface RediagramConfig {
  core: RediagramCoreOption;
  [name: string]: any;
}
