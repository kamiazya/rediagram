import React, { FC, isValidElement } from 'react';
import { Node, Edge, ClusterPortal } from '@ts-graphviz/react';
import t from 'prop-types';
import { useAssertProvider } from '../../hooks/assert-provider';

type Props = {
  name: string;
  upstream?: string[];
};

export const Text: FC<Props> = ({ name, upstream, children }) => {
  useAssertProvider();
  return (
    <>
      <Node
        id={name}
        shape="plaintext"
        label={isValidElement(children) || typeof children === 'string' ? children : name}
      />
      <ClusterPortal>
        {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
      </ClusterPortal>
    </>
  );
};

Text.displayName = 'Text';
Text.defaultProps = {
  upstream: [],
};

Text.propTypes = {
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
