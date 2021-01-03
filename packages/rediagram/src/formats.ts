import { ReactElement } from 'react';
import path from 'path';
import caller from 'caller';
import { RediagramRootComponent } from '@rediagram/common';
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

/**
 * Output PNG image.
 */
export function PNG(diagram: ReactElement<any, RediagramRootComponent>, options: RenderOption = {}): void {
  try {
    const p = path.parse(caller());
    Rediagram.register({
      diagram,
      name: options.name ?? p.name,
      output: {
        dir: options.dir ?? Rediagram.config.output.dir ?? p.dir,
        format: 'png',
      },
    });
  } catch (err) {
    Rediagram.logger.error(err);
  }
}

/**
 * Output SVG file.
 */
export function SVG(diagram: ReactElement<any, RediagramRootComponent>, options: RenderOption = {}): void {
  try {
    const p = path.parse(caller());
    Rediagram.register({
      diagram,
      name: options.name ?? p.name,
      output: {
        dir: options.dir ?? Rediagram.config.output.dir ?? p.dir,
        format: 'svg',
      },
    });
  } catch (err) {
    Rediagram.logger.error(err);
  }
}

/**
 * Output PDF file.
 */
export function PDF(diagram: ReactElement<any, RediagramRootComponent>, options: RenderOption = {}): void {
  try {
    const p = path.parse(caller());
    Rediagram.register({
      diagram,
      name: options.name ?? p.name,
      output: {
        dir: options.dir ?? Rediagram.config.output.dir ?? p.dir,
        format: 'pdf',
      },
    });
  } catch (err) {
    Rediagram.logger.error(err);
  }
}
