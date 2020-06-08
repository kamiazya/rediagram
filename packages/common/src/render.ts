import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot, RenderDotOption } from '@ts-graphviz/node';

export function renderToFile(element: ReactElement, option?: RenderDotOption): void {
  const dot = renderToDot(element);
  renderDot(dot, option);
}

export function renderStdout(element: ReactElement, cb?: (err?: Error) => void): void {
  const dot = renderToDot(element);
  process.stdout.write(dot, cb);
}
