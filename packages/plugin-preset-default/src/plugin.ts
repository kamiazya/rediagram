import { RediagramPluginModule } from '@rediagram/common';

export const DefaultPresetModule: RediagramPluginModule = {
  name: 'preset-default',
  create(_, { core }) {
    core.loadPlugin('@rediagram/plugin-dot');
    core.loadPlugin('@rediagram/plugin-sharp');
    core.loadPlugin('@rediagram/plugin-sucrase');
    return {};
  },
};
