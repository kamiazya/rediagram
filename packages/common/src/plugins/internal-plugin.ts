import fs from 'node:fs';
import path from 'node:path';
import { RediagramPluginModule, SVGNode } from '../types';

function encode(data: Buffer, mediaType: string) {
  const dataBase64 = Buffer.isBuffer(data) ? data.toString('base64') : Buffer.from(data).toString('base64');
  const dataImgBase64 = `data:${mediaType};base64,${dataBase64}`;

  return dataImgBase64;
}

async function emmbedImage(node: SVGNode): Promise<void> {
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

export const InternalPluginModule: RediagramPluginModule = {
  name: 'internal',
  setup() {
    return {
      transformers: {
        emmbedImage,
      },
    };
  },
};
