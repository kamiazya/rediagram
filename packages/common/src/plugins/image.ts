import path from 'path';
import sharp from 'sharp';
import { writeFile } from 'fs-extra';
import { RediagramExportFunction, RediagramPluginModule } from '../rediagram/types';
import { svgToImageDataURL } from '../rediagram/utils';

export const ImagePluginModule: RediagramPluginModule = {
  name: 'image',
  create(_, { logger }) {
    const createImageExporter = (format: string): RediagramExportFunction => {
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
      exporter: {
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
