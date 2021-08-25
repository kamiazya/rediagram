import { ReactElement } from 'react';
import path from 'path';
import caller from 'caller';
import { Rediagram } from './core';

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
  try {
    const p = path.parse(_caller);
    const output = await Rediagram.render(element, {
      format: 'png',
      name: name ?? p.name,
      dir: dir ?? Rediagram.config.output.dir ?? p.dir,
    });
    Rediagram.logger.info('Output', path.relative(process.cwd(), output));
  } catch (err) {
    Rediagram.logger.error(err);
  }
}

/**
 * Output SVG file.
 */
export function SVG(element: ReactElement, options?: RenderOption): Promise<void>;
export async function SVG(
  element: ReactElement,
  { name, dir, _caller = caller() }: InternalRenderOption = {},
): Promise<void> {
  try {
    const p = path.parse(_caller);
    const output = await Rediagram.render(element, {
      format: 'svg',
      name: name ?? p.name,
      dir: dir ?? Rediagram.config.output.dir ?? p.dir,
    });
    Rediagram.logger.info('Output', path.relative(process.cwd(), output));
  } catch (err) {
    Rediagram.logger.error(err);
  }
}

/**
 * Output PDF file.
 */
export function PDF(element: ReactElement, options?: RenderOption): Promise<void>;
export async function PDF(
  element: ReactElement,
  { name, dir, _caller = caller() }: InternalRenderOption = {},
): Promise<void> {
  try {
    const p = path.parse(_caller);
    const output = await Rediagram.render(element, {
      format: 'pdf',
      name: name ?? p.name,
      dir: dir ?? Rediagram.config.output.dir ?? p.dir,
    });
    Rediagram.logger.info('Output', path.relative(process.cwd(), output));
  } catch (err) {
    Rediagram.logger.error(err);
  }
}
