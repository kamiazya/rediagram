/* eslint-disable no-restricted-syntax */
// import path from 'path';
import { isValidElement } from 'react';
import { PreprocessResult, RediagramPluginModule, RediagramPostprocesser } from '@rediagram/common';
import { isValidMeta } from './validation';
import { CommonRediagramFormatModule } from './types';

export const CommonRediagramFormatPluginModule: RediagramPluginModule = {
  name: 'crf',
  create(_, { logger, core }) {
    const CommonRediagramFormatPostprocessor: RediagramPostprocesser<CommonRediagramFormatModule> = {
      match(result: PreprocessResult): result is CommonRediagramFormatModule {
        if (typeof result === 'object' && result !== null) {
          const { default: meta, ...exported } = result as any;
          if (meta !== undefined && !isValidMeta(meta)) {
            return false;
          }
          for (const [, crfLike] of Object.entries(exported)) {
            if (typeof crfLike !== 'function') {
              return false;
            }
          }
        }
        return true;
      },
      postprocess({ default: meta, ...exported }) {
        for (const [name, crf] of Object.entries(exported)) {
          const element = crf();
          if (isValidElement(element)) {
            try {
              core.render(element, {
                name: crf.title ?? name,
                dir: meta?.dir ?? core.config.output.dir,
                format: meta?.format,
              });
            } catch (err) {
              logger.error(err);
            }
          }
        }
      },
    };

    return {
      postprocessors: [CommonRediagramFormatPostprocessor],
    };
  },
};
