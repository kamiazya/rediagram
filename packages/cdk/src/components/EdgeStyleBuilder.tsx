import React, { FC } from 'react';
import { BuildEdgeStyle } from '../types';
import { EdgeStyleBuilderContext } from '../contexts/EdgeStyleBuilderContext';

export const EdgeStyleBuilder: FC<{ build: BuildEdgeStyle }> = ({ build, children }) => (
  <EdgeStyleBuilderContext.Provider value={build}>{children}</EdgeStyleBuilderContext.Provider>
);
