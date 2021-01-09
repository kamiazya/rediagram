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
  const p = path.parse(caller());
  const output = {
    name: options.name ?? p.name,
    dir: options.dir ?? Rediagram.config.output.dir ?? p.dir,
    format: 'png',
  };
  Rediagram.render(diagram, output).catch((e) => Rediagram.logger.error(e));
}

/**
 * Output SVG file.
 */
export function SVG(diagram: ReactElement<any, RediagramRootComponent>, options: RenderOption = {}): void {
  const p = path.parse(caller());
  const output = {
    name: options.name ?? p.name,
    dir: options.dir ?? Rediagram.config.output.dir ?? p.dir,
    format: 'svg',
  };
  Rediagram.render(diagram, output).catch((e) => Rediagram.logger.error(e));
}

/**
 * Output PDF file.
 */
export function PDF(diagram: ReactElement<any, RediagramRootComponent>, options: RenderOption = {}): void {
  const p = path.parse(caller());
  const output = {
    name: options.name ?? p.name,
    dir: options.dir ?? Rediagram.config.output.dir ?? p.dir,
    format: 'pdf',
  };
  Rediagram.render(diagram, output).catch((e) => Rediagram.logger.error(e));
}
