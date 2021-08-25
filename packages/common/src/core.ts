import path from 'path';
import { ensureDir } from 'fs-extra';
import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { exportToFile } from '@ts-graphviz/node';
import { RediagramConfig, Logger, RenderOption, RediagramCore } from './types';

export class Core implements RediagramCore {
  public readonly logger: Logger;

  public readonly config: Readonly<RediagramConfig>;

  constructor(config: RediagramConfig, logger: Logger) {
    this.config = Object.freeze({ ...config });
    this.logger = logger;
  }

  public async render(element: ReactElement, options: RenderOption): Promise<string> {
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
    return output;
  }

  public async run(src: string): Promise<void> {
    try {
      this.logger.info('Runing', src);
      const resolved = path.resolve(src);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(resolved);
      delete require.cache[resolved];
    } catch (err) {
      this.logger.error(err);
    }
  }
}
