import React, { ReactElement } from 'react';
import { DOT } from '@ts-graphviz/react';

export const SubLabel = (label: string): ReactElement => {
  return <DOT.FONT COLOR="#5A6B86">{label}</DOT.FONT>;
};
