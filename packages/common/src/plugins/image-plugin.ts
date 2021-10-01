import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { INode, parse, stringify } from 'svgson';
import { RediagramExporter, RediagramPluginModule } from '../types';

function encode(data: Buffer, mediaType: string) {
  const dataBase64 = Buffer.isBuffer(data) ? data.toString('base64') : Buffer.from(data).toString('base64');
  const dataImgBase64 = `data:${mediaType};base64,${dataBase64}`;

  return dataImgBase64;
}

function emmbedImage(node: INode): void {
  if (node.type === 'element' && node.name === 'image') {
    const imagePath = node.attributes['xlink:href'];
    if (imagePath) {
      const imgFormat = path.extname(imagePath).slice(1);
      const image = fs.readFileSync(imagePath, { flag: 'r' });
      const imageSrc = encode(image, `image/${imgFormat}`);
      // eslint-disable-next-line no-param-reassign
      node.attributes['xlink:href'] = imageSrc;
    }
  }
  node.children.forEach(emmbedImage);
}

function toFormat(type: keyof sharp.FormatEnum): RediagramExporter {
  return async (svg, option) => {
    const ast = await parse(svg, {
      transformNode(node) {
        emmbedImage(node);
        return node;
      },
    });

    const output = path.format({
      dir: option.dir,
      name: option.name,
      ext: `.${option.format}`,
    });
    await sharp(Buffer.from(stringify(ast)), {
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
