import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { ChildProcessOptions, exportToFile, Format } from '@ts-graphviz/node';
import { CONFIG } from '@rediagram/common';
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

async function render(
  element: ReactElement,
  {
    name,
    dir,
    format,
    dotOptions,
  }: Required<RenderOption> & {
    format: Format;
    dotOptions: ChildProcessOptions;
  },
): Promise<void> {
  const dot = renderToDot(element);
  const output = path.format({ dir, name, ext: `.${format}` });
  if (dir !== undefined) {
    await ensureDir(dir);
  }
  await exportToFile(dot, {
    format,
    output,
    childProcessOptions: dotOptions,
  });
}

/**
 * Output PNG image.
 */
export function PNG(element: ReactElement, options?: RenderOption): Promise<void>;
export async function PNG(
  element: ReactElement,
  { name, dir, _caller = caller() }: InternalRenderOption = {},
): Promise<void> {
  const p = path.parse(_caller);
  await render(element, {
    format: 'png',
    name: name ?? p.name,
    dir: dir ?? CONFIG.output.getDir() ?? p.dir,
    dotOptions: {
      timeout: CONFIG.dot?.getTimeout(),
    },
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
  await render(element, {
    format: 'svg',
    name: name ?? p.name,
    dir: dir ?? CONFIG.output.getDir() ?? p.dir,
    dotOptions: {
      timeout: CONFIG.dot?.getTimeout(),
    },
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
  await render(element, {
    format: 'pdf',
    name: name ?? p.name,
    dir: dir ?? CONFIG.output.getDir() ?? p.dir,
    dotOptions: {
      timeout: CONFIG.dot?.getTimeout(),
    },
  });
}
