/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import yaml from 'js-yaml';
import { PreprocessResult, RediagramPluginModule, RediagramPreprocessFunction } from '@rediagram/common';

export const YAMLPluginModule: RediagramPluginModule = {
  name: 'yaml',
  create(_, { logger }) {
    // eslint-disable-next-line consistent-return
    const yamlPreprocess: RediagramPreprocessFunction = (filepath: string): PreprocessResult => {
      try {
        logger.debug('Processing...', filepath);
        const text = fs.readFileSync(filepath, { encoding: 'utf-8' });
        return yaml.load(text, {
          filename: filepath,
          json: true,
          onWarning(warn) {
            logger.warn(`Warning on "${filepath}"`, warn);
          },
        });
      } catch (err) {
        logger.error(`Error on "${filepath}"`, err);
      }
    };
    return {
      preprocessors: {
        yaml: yamlPreprocess,
        yml: yamlPreprocess,
      },
    };
  },
};
