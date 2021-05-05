import cmd from 'commander';
import glob from 'fast-glob';
import chokidar from 'chokidar';
import { Rediagram } from 'rediagram';
import pkg from './pkg';

type Options = {
  watch: boolean;
};

const rediagramProcess = Rediagram.process.bind(Rediagram);

cmd
  .name('rediagramc')
  .version(pkg.version)
  .arguments('[pattarns...]')
  .option('-w, --watch', 'Watch files for changes and rerun rediagram related to changed files.', false)
  .action(async function rediagramc(this: Options, pattarns: string[]): Promise<void> {
    const paths =
      pattarns.length >= 1
        ? pattarns
        : [...Rediagram.config.scope.includes, ...Rediagram.config.scope.excludes.map((p) => `!${p}`)];
    if (this.watch) {
      chokidar.watch(paths).on('add', rediagramProcess).on('change', rediagramProcess);
    } else {
      const sources = await glob(paths, {
        dot: true,
        extglob: true,
        onlyFiles: true,
      });
      sources.forEach(rediagramProcess);
    }
  })
  .parse(process.argv);
