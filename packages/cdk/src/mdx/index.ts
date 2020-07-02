import { Plugin } from '@ts-graphviz/mdx';
import { ProviderContext } from '../contexts/ProviderContext';
import { Dependences } from '../components/Dependence';

import { Provider } from '../components/Provider';

export const CDKPlugin: Plugin = {
  graphviz: {
    ProviderContextProvider: ProviderContext.Provider,
    Dependences,
    Provider,
  },
};
