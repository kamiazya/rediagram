import { exportToBuffer } from '@ts-graphviz/node';
import { renderToDot } from '@ts-graphviz/react';
import { ReactElement } from 'react';
import { RediagramPluginModule } from '../rediagram/types';

interface DotPluginOption {
  timeout?: number;
}

export const DotPluginModule: RediagramPluginModule<DotPluginOption> = {
  name: 'dot',
  create(option) {
    return {
      renderer: {
        async dot(element: ReactElement): Promise<Buffer> {
          const dot = renderToDot(element);
          return exportToBuffer(dot, {
            format: 'svg',
            suppressWarnings: true,
            childProcessOptions: {
              timeout: option.timeout ?? 10_000,
            },
          });
        },
      },
    };
  },
  optionSchema: {
    type: 'object',
    properties: {
      timeout: {
        type: 'number',
        minimum: 0,
        nullable: true,
      },
    },
    required: [],
    additionalProperties: false,
  },
};
