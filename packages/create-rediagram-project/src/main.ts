import chalk from 'chalk';
import { CommanderError } from 'commander';
import { command } from './command';

try {
  command.parse(process.argv);
} catch (err) {
  if (err instanceof CommanderError) {
    if (!['commander.version', 'commander.helpDisplayed'].includes(err.code)) {
      if (err.code === 'commander.missingArgument') err.code = 'MissingArgument';
      // eslint-disable-next-line no-console
      console.log(chalk.red`{bold ${err.code}}\n${err.message}\n`);
      command.outputHelp();
      process.exit(err.exitCode);
    }
  }
}
