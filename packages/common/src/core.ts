import path from 'node:path';
import { ensureDir } from 'fs-extra';
import { ReactElement } from 'react';
import { parse, stringify } from 'svgson';
import { RediagramConfig, Logger, ExportOption, RediagramCore, RediagramRootComponent } from './types';
import { PluginManager } from './plugin-manager';

export class Core implements RediagramCore {
  private plugins: PluginManager;

  public readonly logger: Logger;

  public readonly config: Readonly<RediagramConfig>;

  constructor(config: RediagramConfig, logger: Logger, plugins: PluginManager) {
    this.config = Object.freeze({ ...config });
    this.logger = logger;
    this.plugins = plugins;
  }

  public async render(element: ReactElement<any, RediagramRootComponent>): Promise<string> {
    const render = this.plugins.getRenderer(element.type.renderer);
    const svg = await render(element);
    const ast = await parse(svg);
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, transform] of this.plugins.getTransformers()) {
      this.logger.debug(`transformer "${name}": start`);
      // eslint-disable-next-line no-await-in-loop
      await transform(ast);
      this.logger.debug(`transformer "${name}": end`);
    }
    return stringify(ast);
  }

  public async export(svg: string, option: ExportOption): Promise<string> {
    const dir =
      option.dir ??
      this.config.output.dir ??
      (this.config.filepath ? path.dirname(this.config.filepath) : process.cwd());
    const format = option.format ?? this.config.output.format;
    const output = path.format({
      dir,
      name: option.name,
      ext: `.${format}`,
    });
    if (dir !== undefined) {
      await ensureDir(dir);
    }
    const exportFunc = this.plugins.getExporter(format);
    await exportFunc(svg, {
      dir,
      name: option.name,
      format,
    });
    return output;
  }

  public async process(element: ReactElement<any, RediagramRootComponent>, options: ExportOption): Promise<string> {
    const svg = await this.render(element);
    const output = await this.export(svg, options);
    return output;
  }

  public async run(src: string): Promise<void> {
    try {
      this.logger.info('Runing', src);
      const resolved = path.resolve(src);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await import(`${resolved}?${Date.now()}`);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
