import { RediagramPluginModule, RediagramExportFunction } from '@rediagram/common';
import path from 'path';
import sharp from 'sharp';
import { writeFile } from 'fs-extra';
import { svgToImageDataURL } from './utils';

export const SharpPluginModule: RediagramPluginModule = {
  name: 'sharp',
  create(_, { logger }) {
    const createImageExporter = (format: keyof sharp.FormatEnum): RediagramExportFunction => {
      return async (svg: string, output: string): Promise<void> => {
        const image = sharp(svgToImageDataURL(svg), {
          density: 96,
        });
        const buffer = await image.toFormat(format).toBuffer();
        await writeFile(output, buffer);
        logger.info('Exporting...', path.relative(process.cwd(), output));
      };
    };

    return {
      exporters: {
        png: createImageExporter('png'),
        webp: createImageExporter('webp'),
        jpg: createImageExporter('jpg'),
        jpeg: createImageExporter('jpg'),
      },
    };
  },
  optionSchema: {
    type: 'object',
    properties: {
      dtp: {
        type: 'number',
        minimum: 0,
        nullable: true,
      },
    },
    required: [],
    additionalProperties: false,
  },
};
