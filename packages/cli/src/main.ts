import cmd from 'commander';
import { version } from './pkg';

interface Option {
  outDir?: string;
}

cmd
  .name('rediagram')
  .version(version)
  .option('-o, --outDir <outDir>', 'Output dir')
  .arguments('<path>')
  .action(function rediagram(this: Option, path: string): void {
    // eslint-disable-next-line no-console
    console.log(this.outDir, path);
  })
  .parse(process.argv);
