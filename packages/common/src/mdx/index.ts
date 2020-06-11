import GraphvizMDX from '@ts-graphviz/mdx';

import { ProviderContext } from '../contexts/ProviderContext';
import { Dependences } from '../components/Dependence';
import { Diagram } from '../components/Diagram';
import { Provider } from '../components/Provider';
import { MDXDiagram } from './components/MDXDiagram';
import { Text } from '../components/Text';

GraphvizMDX.use({
  mdx: {
    Diagram: MDXDiagram,
  },
  graphviz: {
    ProviderContextProvider: ProviderContext.Provider,
    Dependences,
    Diagram,
    Provider,
    Text,
  },
});