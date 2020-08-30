import { createContext } from 'react';
import { EdgeAttributes } from 'ts-graphviz';

export const DependenciesEdgeAttributesContext = createContext<EdgeAttributes>({});
