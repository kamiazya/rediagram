import { ReactElement } from 'react';
import path from 'path';
import caller from 'caller';
import { Rediagram } from './core';

type RenderOption = {
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
  await Rediagram.render(element, {
    format: 'png',
    name: name ?? p.name,
    dir: dir ?? Rediagram.config.output.dir ?? p.dir,
  });
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
  await Rediagram.render(element, {
    format: 'svg',
    name: name ?? p.name,
    dir: dir ?? Rediagram.config.output.dir ?? p.dir,
  });
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
  await Rediagram.render(element, {
    format: 'pdf',
    name: name ?? p.name,
    dir: dir ?? Rediagram.config.output.dir ?? p.dir,
  });
}
