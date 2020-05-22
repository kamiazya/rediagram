import { resolve } from 'path';
import React, { FC } from 'react';
import { Node, Edge, ClusterPortal } from '@ts-graphviz/react';
import t from 'prop-types';

type Props = {
  name: string;
  upstream?: string[];
};

const icon = resolve(__dirname, '../../../assets/queue/activemq.png');

export const Activemq: FC<Props> = ({ name, upstream }) => (
  <>
    <Node id={name} image={icon} shape="none" />
    <ClusterPortal>
      {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
    </ClusterPortal>
  </>
);

Activemq.displayName = 'Activemq';
Activemq.defaultProps = {
  upstream: [],
};

Activemq.propTypes = {
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
