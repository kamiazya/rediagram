import React, { FC } from 'react';
import { Edge } from '@ts-graphviz/react';
import t from 'prop-types';

type Props = {
  origin: string;
  destination: string;
  description?: string;
};

export const Dependence: FC<Props> = ({ origin, destination, description }) => (
  <Edge targets={[origin, destination]} label={description} />
);

Dependence.defaultProps = {
  description: undefined,
};

Dependence.propTypes = {
  origin: t.string.isRequired,
  destination: t.string.isRequired,
  description: t.string,
};
