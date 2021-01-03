import path from 'path';
import { registerAll } from 'sucrase/dist/register';
import { RediagramPluginModule } from '../rediagram/types';

export const SucrasePluginModule: RediagramPluginModule = {
  name: 'sucrase',
  create(_, { logger }) {
    registerAll();

    const runScript = (filepath: string): void => {
      try {
        logger.info('Processing...', filepath);
        const resolved = path.resolve(filepath);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        require(resolved);
        delete require.cache[resolved];
      } catch (err) {
        logger.error(err);
      }
    };
    return {
      preprocessor: {
        ts: runScript,
        tsx: runScript,
        js: runScript,
        jsx: runScript,
      },
    };
  },
};
