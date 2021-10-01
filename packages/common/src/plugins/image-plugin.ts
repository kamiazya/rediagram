import path from 'node:path';
import sharp from 'sharp';
import { RediagramExporter, RediagramPluginModule } from '../types';

function toFormat(type: keyof sharp.FormatEnum): RediagramExporter {
  return async (svg, option) => {
    const output = path.format({
      dir: option.dir,
      name: option.name,
      ext: `.${option.format}`,
    });
    await sharp(Buffer.from(svg), {
      density: 96,
    })
      .toFormat(type)
      .toFile(output);
    return output;
  };
}

export const ImagePluginModule: RediagramPluginModule = {
  name: 'image',
  setup() {
    return {
      exporters: {
        png: toFormat('png'),
        jpg: toFormat('jpg'),
        jpeg: toFormat('jpeg'),
        webp: toFormat('webp'),
      },
    };
  },
};
