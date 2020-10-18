import { CommanderError } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import validate from 'validate-npm-package-name';

export function assertArgs(name: string, pm: string): void {
  if (name !== path.basename(name)) {
    throw new CommanderError(1, assertArgs.key, 'name must be a directory name that can be created.');
  }
  const { validForNewPackages, warnings, errors } = validate(name);
  if (!validForNewPackages) {
    throw new CommanderError(
      1,
      assertArgs.key,
      `name must be a package name that can be created.\n${[
        ...(errors ?? []).map((msg) => `  error: ${msg}`),
        ...(warnings ?? []).map((msg) => `  worning: ${msg}`),
      ].join('\n')}`,
    );
  }
  if (fs.pathExistsSync(path.resolve(process.cwd(), name))) {
    throw new CommanderError(1, assertArgs.key, `'${name}' directory already exists.`);
  }

  if (!['npm', 'yarn'].includes(pm)) {
    throw new CommanderError(1, assertArgs.key, `'${pm}' is not supportted. choose from yarn or npm`);
  }
}
assertArgs.key = 'ValidationError';
