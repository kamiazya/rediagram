import fs from 'node:fs';
import path from 'node:path';
import { optimize } from 'svgo';
import { ExportOption, RediagramPluginModule } from '../types';

export const SVGPluginModule: RediagramPluginModule = {
  name: 'svg',
  setup() {
    return {
      exporters: {
        async svg(svg: string, option: Required<ExportOption>): Promise<string> {
          const output = path.format({
            dir: option.dir,
            name: option.name,
            ext: '.svg',
          });
          const { data } = optimize(svg);
          await fs.promises.writeFile(output, data);
          return output;
        },
      },
    };
  },
};
