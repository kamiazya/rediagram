/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

function encode(data: Buffer, mediaType: string) {
  const dataBase64 = Buffer.isBuffer(data) ? data.toString('base64') : Buffer.from(data).toString('base64');
  const dataImgBase64 = `data:${mediaType};base64,${dataBase64}`;

  return dataImgBase64;
}

const SVG_HEADER =
  '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"\n "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';

export function toSVG(body: string): Buffer {
  return Buffer.from(SVG_HEADER + body, 0, SVG_HEADER.length + body.length);
}

export function svgToImageDataURL(svg: string): Buffer {
  const dom = new JSDOM();
  dom.window.document.querySelector('body')!.innerHTML = svg;
  const targets = dom.window.document.querySelectorAll('image');
  targets.forEach((target) => {
    const imagePath = target.getAttribute('xlink:href');
    if (imagePath) {
      const imgFormat = path.extname(imagePath).slice(1);
      const image = fs.readFileSync(imagePath, {
        flag: 'r',
      });
      const imageSrc = encode(image, `image/${imgFormat}`);
      target.setAttribute('xlink:href', imageSrc);
    }
  });

  const imageEmbedSVG = dom.window.document.querySelector('body')!.innerHTML;
  return toSVG(imageEmbedSVG);
}
