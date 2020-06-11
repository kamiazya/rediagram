import React, { FC, isValidElement } from 'react';
import { Node, ClusterPortal } from '@ts-graphviz/react';
import { Dependences, HasDependences } from './Dependence';

type Props = {
  name: string;
} & HasDependences;

export const Text: FC<Props> = ({ name, upstream, downstream, children }) => {
  return (
    <>
      <Node
        id={name}
        shape="plaintext"
        label={isValidElement(children) || typeof children === 'string' ? children : name}
      />
      <ClusterPortal>
        <Dependences origin={name} upstream={upstream} downstream={downstream} />
      </ClusterPortal>
    </>
  );
};

Text.displayName = 'Text';
