import cmd from 'commander';
import glob from 'fast-glob';
import { register } from 'ts-node';
import path from 'path';
import { version } from './pkg';

cmd
  .name('rediagramc')
  .version(version)
  .arguments('[pattarns...]')
  .action(async function rediagramc(pattarns: string[]): Promise<void> {
    register({
      transpileOnly: true,
      project: require.resolve('@rediagram/tsconfig/tsconfig.json'),
    });
    const sources = await glob([...pattarns, '**/*.rediagram.{jsx,tsx}', '!**/node_modules/**/*'], {
      dot: true,
      extglob: true,
      onlyFiles: true,
    });
    sources.forEach((src) => {
      const resolved = path.resolve(src);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(resolved);
    });
  })
  .parse(process.argv);
