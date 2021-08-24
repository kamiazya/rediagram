import { Format } from '@ts-graphviz/node';

export type RediagramGlobalConfig = {
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
