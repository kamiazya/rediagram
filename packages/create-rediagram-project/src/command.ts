/* eslint-disable @typescript-eslint/no-unused-vars, func-names, no-console */
import { createCommand } from 'commander';
import fs from 'fs-extra';
import chalk from 'chalk';
import { ncp } from 'ncp';
import path from 'path';
import replacestream from 'replacestream';
import spawn from 'cross-spawn';
import dedent from 'dedent';
import pkg from './pkg';
import { assertArgs } from './assert-args';

export const command = createCommand(pkg.name)
  .version(pkg.version)
  .arguments('<name>')
  .action(function (name: string) {
    assertArgs(name);
    const cwd = process.cwd();
    const src = path.resolve(__dirname, '../templates/typescript');
    const dist = path.resolve(cwd, name);
    fs.ensureDirSync(dist);
    ncp(
      src,
      dist,
      {
        clobber: true,
        dereference: true,
        transform(read, write) {
          read.pipe(replacestream('{{name}}', name)).pipe(write);
        },
      },
      () => {
        console.log(chalk`🌈 Createing new rediagram project in {bold ${name}}.`);
        console.log();
        console.log(chalk`⭐️ Installing packages. This take a couple of minutes.`);
        spawn.sync('npm', ['install'], {
          cwd: dist,
          stdio: 'inherit',
        });
        console.log(
          dedent(chalk`
          ✨ The installation is complete.

          👉 Get started with following commands:

              {gray # Move to the project directory with the following command.}
              {bold $} {cyan cd} ${name}

          🚀 {bold In the project directory, you can run:}

              {gray # Runs {bold src/*.rediagram.tsx} scripts and output the image with rediagram.}
              {bold $} {cyan npm} start



                    {yellow.bold Tahnks for installing rediagram 🙏}

                      Please consider donating to help
                        maintain rediagram packages!

              GitHub Sponsor: {white.underline https://github.com/sponsors/kamiazya/}
                        ko-fi: {white.underline https://ko-fi.com/kamiazya}
          `),
        );
        console.log();
      },
    );
  })
  .exitOverride();
