import { exportToBuffer } from '@ts-graphviz/node';
import { renderToDot } from '@ts-graphviz/react';
import { RediagramPlugin, RediagramPluginModule } from '../types';

interface DotPluginOption {
  timeout?: number;
}

export const DotPluginModule: RediagramPluginModule<DotPluginOption> = {
  name: 'dot',
  setup({ option: { timeout = 10_000 } }): RediagramPlugin {
    return {
      renderers: {
        async dot(element) {
          const dot = renderToDot(element);
          const buf = await exportToBuffer(dot, {
            format: 'svg',
            suppressWarnings: true,
            childProcessOptions: {
              timeout,
            },
          });
          return buf.toString('utf-8');
        },
      },
    };
  },
};
