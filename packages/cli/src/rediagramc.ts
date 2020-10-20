import cmd from 'commander';
import glob from 'fast-glob';
import { registerAll } from 'sucrase/dist/register';
import path from 'path';
import pkg from './pkg';

cmd
  .name('rediagramc')
  .version(pkg.version)
  .arguments('[pattarns...]')
  .action(async function rediagramc(pattarns: string[]): Promise<void> {
    registerAll();
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
