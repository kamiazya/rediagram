import cmd from 'commander';
import glob from 'fast-glob';
import chokidar from 'chokidar';
import { Rediagram } from 'rediagram';
import { registerAll } from 'sucrase/dist/register';
import pkg from './pkg';

type Options = {
  watch: boolean;
};

cmd
  .name('rediagramc')
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
      chokidar.watch(paths).on('add', Rediagram.run).on('change', Rediagram.run);
    } else {
      const sources = await glob(paths, {
        dot: true,
        extglob: true,
        onlyFiles: true,
      });
      sources.forEach(Rediagram.run);
    }
  })
  .parse(process.argv);
