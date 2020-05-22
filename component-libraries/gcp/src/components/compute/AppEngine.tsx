import { resolve } from 'path';
import React, { FC } from 'react';
import { Node, Edge, ClusterPortal } from '@ts-graphviz/react';
import t from 'prop-types';

type Props = {
  name: string;
  upstream?: string[];
};

const icon = resolve(__dirname, '../../../assets/compute/app-engine.png');

export const AppEngine: FC<Props> = ({ name, upstream }) => (
  <>
    <Node id={name} image={icon} shape="none" />
    <ClusterPortal>
      {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
    </ClusterPortal>
  </>
);

AppEngine.displayName = 'AppEngine';
AppEngine.defaultProps = {
  upstream: [],
};

AppEngine.propTypes = {
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
