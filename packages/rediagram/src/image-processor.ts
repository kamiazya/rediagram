import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot, Format } from '@ts-graphviz/node';
import { parse, format as fmt } from 'path';
import fs from 'fs-extra';
import caller from 'caller';

type RenderOption = {
  format: Format;
  dir?: string;
  path?: string;
};

function processImage(element: ReactElement, options: RenderOption): void {
  const p = parse(caller(2));
  const dot = renderToDot(element);
  fs.ensureDirSync(options.dir ?? p.dir);
  renderDot(dot, {
    format: options.format,
    output: fmt({
      dir: options.dir ?? p.dir,
      name: options.path ?? p.name,
      ext: `.${options.format}`,
    }),
  });
}

export type ImageProcessorOptions = { path?: string };
export type ImageProcessor = (element: ReactElement, options?: ImageProcessorOptions) => void;

export function createImageProcessor(format: Format, { dir }: { dir?: string } = {}): ImageProcessor {
  return (element: ReactElement, { path }: ImageProcessorOptions = {}): void => {
    processImage(element, { format, path, dir });
  };
}
