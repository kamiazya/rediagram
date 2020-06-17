/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Graphviz } from '@ts-graphviz/mdx';
import { Diagram, DiagramProps } from '../../components/Diagram';

export const MDXDiagram: FC<DiagramProps> = ({ children, ...props }) => (
  <Graphviz>
    <Diagram {...props}>{children}</Diagram>
  </Graphviz>
);
