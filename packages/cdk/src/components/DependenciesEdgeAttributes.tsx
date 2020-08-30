import React, { FC } from 'react';
import { EdgeAttributes } from 'ts-graphviz';
import { DependenciesEdgeAttributesContext } from '../contexts/DependenciesEdgeAttributesContext';

export const DependenciesEdgeAttributes: FC<EdgeAttributes> = ({ children, ...edgeAttributes }) => {
  return (
    <DependenciesEdgeAttributesContext.Provider value={edgeAttributes}>
      {children}
    </DependenciesEdgeAttributesContext.Provider>
  );
};

DependenciesEdgeAttributes.displayName = 'DependenciesEdgeAttributes';
