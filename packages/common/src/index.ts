import GraphvizMDX from '@ts-graphviz/mdx';

import { GroupContext } from './contexts/GroupContext';
import { ProviderContext } from './contexts/ProviderContext';
import { Dependence } from './components/Dependence';
import { Diagram, DiagramProps } from './components/Diagram';
import { Provider } from './components/Provider';
import { Group } from './components/Group';
import { MDXDiagram } from './mdx/MDXDiagram';

export * from './render';
export * from './hooks/group-bgcolor';
export * from './hooks/provider';

GraphvizMDX.use({
  mdx: {
    Diagram: MDXDiagram,
  },
  graphviz: {
    // 'GroupContext.Provider': GroupContext.Provider,
    ProviderContextProvider: ProviderContext.Provider,
    Dependence,
    Diagram,
    Provider,
    Group,
  },
});

export { GroupContext, ProviderContext, Dependence, Diagram, Provider, Group, DiagramProps };
