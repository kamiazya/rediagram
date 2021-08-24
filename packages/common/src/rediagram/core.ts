import path from 'path';
import { ensureDir } from 'fs-extra';
import { Logger } from 'tslog';
import { ReactElement } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { exportToFile } from '@ts-graphviz/node';
import { RediagramGlobalConfig, loadConfigfile } from '../config';
import { RenderOption } from './types';

export class RediagramCore {
  public static readonly MODULE_NAME = 'rediagram';

  private static instance?: RediagramCore;

  public logger = new Logger({
    type: 'pretty',
    name: 'rediagram',
    displayDateTime: false,
    displayFilePath: 'hidden',
    displayFunctionName: false,
  });

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

    this.logger.info(
      'Config file is',
      config.filepath ? `"./${path.relative(process.cwd(), config.filepath)}".` : 'not exist.',
    );
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
    this.logger.info('Output', path.relative(process.cwd(), output));
    await exportToFile(dot, {
      format,
      output,
      childProcessOptions: {
        timeout: this.config.dot.timeout,
      },
    });
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
