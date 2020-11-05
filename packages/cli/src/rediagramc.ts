import cmd from 'commander';
import glob from 'fast-glob';
import chokidar from 'chokidar';
import { CONFIG } from '@rediagram/common';
import { registerAll } from 'sucrase/dist/register';
import path from 'path';
import pkg from './pkg';

type Options = {
  watch: boolean;
};

function runRediagram(src: string) {
  // eslint-disable-next-line no-console
  console.log(src);
  const resolved = path.resolve(src);
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(resolved);
  delete require.cache[resolved];
}

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
        : [...CONFIG.scope.getIncludesPattarns(), ...CONFIG.scope.getExcludesPattarns().map((p) => `!${p}`)];
    if (this.watch) {
      chokidar.watch(paths).on('add', runRediagram).on('change', runRediagram);
    } else {
      const sources = await glob(paths, {
        dot: true,
        extglob: true,
        onlyFiles: true,
      });
      sources.forEach(runRediagram);
    }
  })
  .parse(process.argv);
