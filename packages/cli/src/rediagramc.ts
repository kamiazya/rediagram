import cmd from 'commander';
import glob from 'fast-glob';
import chokidar from 'chokidar';
import { Rediagram } from 'rediagram';
import { registerAll } from 'sucrase/dist/register';
import pkg from './pkg';

type Options = {
  watch: boolean;
};

const NAME = 'rediagramc';

const logger = Rediagram.logger.getChildLogger({ name: NAME });

cmd
  .name(NAME)
  .version(pkg.version)
  .arguments('[pattarns...]')
  .option('-w, --watch', 'Watch files for changes and rerun rediagram related to changed files.', false)
  .action(async function rediagramc(this: Options, pattarns: string[]): Promise<void> {
    registerAll();
    const paths =
      pattarns.length >= 1
        ? pattarns
        : [...Rediagram.config.scope.includes, ...Rediagram.config.scope.excludes.map((p) => `!${p}`)];
    if (this.watch) {
      chokidar
        .watch(paths)
        .on('add', async (src) => {
          logger.info('Added', src);
          await Rediagram.run(src);
        })
        .on('change', async (src) => {
          logger.info('Changed', src);
          await Rediagram.run(src);
        });
    } else {
      const sources = await glob(paths, {
        dot: true,
        extglob: true,
        onlyFiles: true,
      });
      sources.forEach(async (src) => {
        logger.info('Start', src);
        await Rediagram.run(src);
        logger.info('End', src);
      });
    }
  })
  .parse(process.argv);
