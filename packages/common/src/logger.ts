import { Logger as TSLogLogger } from 'tslog';

export type Logger = TSLogLogger;

export const LOGGER = new TSLogLogger({
  type: 'pretty',
  name: 'root',
  displayDateTime: false,
  displayFilePath: 'hidden',
  displayFunctionName: false,
});
