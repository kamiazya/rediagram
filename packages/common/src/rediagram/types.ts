import { Format } from '@ts-graphviz/node';

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
