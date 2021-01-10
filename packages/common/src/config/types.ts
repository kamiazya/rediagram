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
  plugins: ReadonlyArray<{
    name: string;
    options?: any;
  }>;
}

export interface RediagramConfig {
  core: RediagramCoreOption;
  [name: string]: any;
}
