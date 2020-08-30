import { useContext } from 'react';
import { DependenciesEdgeAttributesContext } from '../contexts/DependenciesEdgeAttributesContext';

export function useDependenciesEdgeAttributes(): any {
  return useContext(DependenciesEdgeAttributesContext);
}
