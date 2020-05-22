import { resolve } from 'path';
import React, { FC } from 'react';
import { Node, Edge, ClusterPortal } from '@ts-graphviz/react';
import t from 'prop-types';

type Props = {
  name: string;
  upstream?: string[];
};

const icon = resolve(__dirname, '../../../assets/compute/ec2.png');

export const EC2: FC<Props> = ({ name, upstream }) => (
  <>
    <Node id={name} image={icon} shape="none" />
    <ClusterPortal>
      {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
    </ClusterPortal>
  </>
);

EC2.displayName = 'EC2';
EC2.defaultProps = {
  upstream: [],
};

EC2.propTypes = {
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
