import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { exportToFile } from '@ts-graphviz/node';
import { ensureDir } from 'fs-extra';
import path from 'path';
import caller from 'caller';

export type RenderOption = {
  /**
   * Output destination directory.
   */
  dir?: string;
  /**
   * Output file name.
   */
  name?: string;
};

type InternalRenderOption = RenderOption & {
  /**
   * @deprecated
   * Temporary support because it was necessary to include it in the argument to hack the TypeScript build result.
   * It is not an API provided to users.
   */
  _caller?: string;
};

/**
 * Output PNG image.
 */
export function PNG(element: ReactElement, options?: RenderOption): Promise<void>;
export async function PNG(
  element: ReactElement,
  { name, dir, _caller = caller() }: InternalRenderOption = {},
): Promise<void> {
  const p = path.parse(_caller);
  const format = 'png';
  const output = path.format({
    dir: dir ?? p.dir,
    name: name ?? p.name,
    ext: `.${format}`,
  });
  const dot = renderToDot(element);
  if (dir !== undefined) {
    await ensureDir(dir);
  }
  await exportToFile(dot, { format, output });
}

/**
 * Output SVG file.
 */
export function SVG(element: ReactElement, options?: RenderOption): Promise<void>;
export async function SVG(
  element: ReactElement,
  { name, dir, _caller = caller() }: InternalRenderOption = {},
): Promise<void> {
  const p = path.parse(_caller);
  const format = 'svg';
  const output = path.format({
    dir: dir ?? p.dir,
    name: name ?? p.name,
    ext: `.${format}`,
  });
  const dot = renderToDot(element);
  if (dir !== undefined) {
    await ensureDir(dir);
  }
  await exportToFile(dot, { format, output });
}

/**
 * Output PDF file.
 */
export function PDF(element: ReactElement, options?: RenderOption): Promise<void>;
export async function PDF(
  element: ReactElement,
  { name, dir, _caller = caller() }: InternalRenderOption = {},
): Promise<void> {
  const p = path.parse(_caller);
  const format = 'pdf';
  const output = path.format({
    dir: dir ?? p.dir,
    name: name ?? p.name,
    ext: `.${format}`,
  });
  const dot = renderToDot(element);
  if (dir !== undefined) {
    await ensureDir(dir);
  }
  await exportToFile(dot, { format, output });
}
