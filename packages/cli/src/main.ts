import cmd from 'commander';
import glob from 'fast-glob';
import { register } from 'ts-node';
import { resolve } from 'path';
import { version } from './pkg';

register();

interface Option {
  outDir?: string;
}

cmd
  .name('rediagram')
  .version(version)
  .option('-o, --outDir <outDir>', 'Output dir')
  .arguments('<pattarn>')
  .action(async function rediagram(this: Option, pattarn: string): Promise<void> {
    const sources = glob.sync([pattarn, '!**/node_modules/**/*'], {
      dot: true,
      extglob: true,
    });
    await Promise.all(sources.map((src) => import(resolve(src))));
  })
  .parse(process.argv);
