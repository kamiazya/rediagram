import path from 'path';
import { registerAll } from 'sucrase/dist/register';
import { PreprocessResult, RediagramPluginModule } from '../rediagram/types';

export const SucrasePluginModule: RediagramPluginModule = {
  name: 'sucrase',
  create(_, { logger }) {
    registerAll();

    // eslint-disable-next-line consistent-return
    function runScript(filepath: string): PreprocessResult {
      try {
        logger.info('Processing...', filepath);
        const resolved = path.resolve(filepath);
        // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
        const m = require(resolved);
        delete require.cache[resolved];
        return m;
      } catch (err) {
        logger.error(err);
      }
    }
    return {
      preprocessors: {
        ts: runScript,
        tsx: runScript,
        js: runScript,
        jsx: runScript,
      },
    };
  },
};
