import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot, RenderDotOption, Format } from '@ts-graphviz/node';
import path from 'path';
import caller from 'caller';

function renderToFile(element: ReactElement, option?: RenderDotOption): void {
  const dot = renderToDot(element);
  renderDot(dot, option);
}

function render(element: ReactElement, format: Format): void {
  const p = path.parse(caller(2));
  renderToFile(element, {
    format,
    output: path.format({
      name: p.name,
      ext: `.${format}`,
    }),
  });
}

export function PNG(element: ReactElement): void {
  const format = 'png';
  render(element, format);
}

export function SVG(element: ReactElement): void {
  const format = 'svg';
  render(element, format);
}

export function PDF(element: ReactElement): void {
  const format = 'pdf';
  render(element, format);
}
