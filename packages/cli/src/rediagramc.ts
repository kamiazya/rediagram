import cmd from 'commander';
import glob from 'fast-glob';
import chokidar from 'chokidar';
import { Rediagram } from 'rediagram';

type Options = {
  watch: boolean;
};

const NAME = 'rediagramc';

const logger = Rediagram.logger.getChildLogger({ name: NAME });

cmd
  .name(NAME)
  .version('[VI]{version}[/VI]')
  .arguments('[pattarns...]')
  .option('-w, --watch', 'Watch files for changes and rerun rediagram related to changed files.', false)
  .action(async function rediagramc(this: Options, pattarns: string[]): Promise<void> {
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
      });
    }
  })
  .parse(process.argv);
