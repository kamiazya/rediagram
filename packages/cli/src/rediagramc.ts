import cmd from 'commander';
import glob from 'fast-glob';
import { register } from 'ts-node';
import path from 'path';
import { version } from './pkg';

cmd
  .name('rediagramc')
  .version(version)
  .arguments('[pattarns...]')
  .action(async function rediagram(pattarns: string[]): Promise<void> {
    register({
      project: require.resolve('@rediagram/tsconfig/tsconfig.json'),
    });
    const sources = glob.sync([...pattarns, '**/*.rediagram.{jsx,tsx}', '!**/node_modules/**/*'], {
      dot: true,
      extglob: true,
      onlyFiles: true,
    });
    await Promise.all(sources.map((src) => import(path.resolve(src))));
  })
  .parse(process.argv);
