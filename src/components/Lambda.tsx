import React, { FC } from 'react';
import { Node, Edge, ClusterPortal } from '@ts-graphviz/react';
import t from 'prop-types';

type Props = {
  name: string;
  upstream?: string[];
};

export const Lambda: FC<Props> = ({ name, upstream }) => (
  <>
    <Node id={name} image="resources/aws/compute/lambda.png" shape="none" />
    <ClusterPortal>
      {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
    </ClusterPortal>
  </>
);

Lambda.displayName = 'EC2';
Lambda.defaultProps = {
  upstream: [],
};

Lambda.propTypes = {
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
