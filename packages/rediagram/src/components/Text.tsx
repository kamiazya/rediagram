import React, { FC } from 'react';
import { Node } from '@ts-graphviz/react';
import { Dependences, HasDependences } from './Dependence';
import { useLabelText } from '../hooks/label';

type Props = {
  name: string;
} & HasDependences;

export const Text: FC<Props> = ({ name, upstream, downstream, children }) => {
  const label = useLabelText(children, { defaultValue: name });
  return (
    <>
      <Node id={name} shape="plaintext" label={label} />
      <Dependences origin={name} upstream={upstream} downstream={downstream} />
    </>
  );
};

Text.displayName = 'Text';
