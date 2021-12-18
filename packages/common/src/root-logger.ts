import { Logger as TSLogLogger } from 'tslog';

export const ROOT_LOGGER = new TSLogLogger({
  type: 'pretty',
  name: 'root',
  displayDateTime: false,
  displayFilePath: 'hidden',
  displayFunctionName: false,
});
