import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot } from '@ts-graphviz/node';

export function renderToFile(element: ReactElement, output: string): void {
  const dot = renderToDot(element);
  renderDot(dot, output);
}

export function renderStdout(element: ReactElement, cb?: (err?: Error) => void): void {
  const dot = renderToDot(element);
  process.stdout.write(dot, cb);
}
