/* eslint-disable class-methods-use-this */
import path from 'path';
import { ensureDir } from 'fs-extra';
import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { exportToFile } from '@ts-graphviz/node';
import { RediagramGlobalConfig, loadConfigfile } from '../config';
import { RenderOption } from './types';

export class RediagramCore {
  public static readonly MODULE_NAME = 'rediagram';

  private static instance?: RediagramCore;

  public static create(): RediagramCore {
    if (!this.instance) {
      const config = loadConfigfile();
      this.instance = new RediagramCore(config);
    }
    return this.instance;
  }

  public readonly config: Readonly<RediagramGlobalConfig>;

  constructor({ ...config }: RediagramGlobalConfig) {
    this.config = Object.freeze(config);
  }

  public async render(element: ReactElement, options: RenderOption): Promise<void> {
    const dot = renderToDot(element);
    const dir = options.dir ?? this.config.output.dir;
    const format = options.format ?? this.config.output.format;
    const output = path.format({
      dir,
      name: options.name,
      ext: `.${format}`,
    });
    if (dir !== undefined) {
      await ensureDir(dir);
    }
    await exportToFile(dot, {
      format,
      output,
      childProcessOptions: {
        timeout: this.config.dot.timeout,
      },
    });
  }

  public async run(src: string): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(src);
    const resolved = path.resolve(src);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(resolved);
    delete require.cache[resolved];
  }
}
