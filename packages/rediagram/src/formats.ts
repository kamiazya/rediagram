import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot } from '@ts-graphviz/node';
import path from 'path';
import caller from 'caller';

type RenderOption = {
  dir?: string;
  name?: string;
};

export function PNG(element: ReactElement, { name, dir }: RenderOption = {}): void {
  const p = path.parse(caller());
  const format = 'png';
  const output = path.format({
    dir: dir ?? p.dir,
    name: name ?? p.name,
    ext: `.${format}`,
  });
  const dot = renderToDot(element);
  // eslint-disable-next-line no-console
  console.log(output);
  renderDot(dot, {
    format,
    output,
  });
}

export function SVG(element: ReactElement, { name, dir }: RenderOption = {}): void {
  const p = path.parse(caller());
  const format = 'svg';
  const output = path.format({
    dir: dir ?? p.dir,
    name: name ?? p.name,
    ext: `.${format}`,
  });
  const dot = renderToDot(element);
  renderDot(dot, {
    format,
    output,
  });
}

export function PDF(element: ReactElement, { name, dir }: RenderOption = {}): void {
  const p = path.parse(caller());
  const format = 'pdf';
  const output = path.format({
    dir: dir ?? p.dir,
    name: name ?? p.name,
    ext: `.${format}`,
  });
  const dot = renderToDot(element);
  renderDot(dot, {
    format,
    output,
  });
}
