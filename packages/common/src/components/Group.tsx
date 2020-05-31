import React, { FC } from 'react';
import { attribute } from 'ts-graphviz';
import { Subgraph } from '@ts-graphviz/react';
import t from 'prop-types';
import { useGroupBgcolor } from '../hooks/group-bgcolor';

type Props = {
  name: string;
};

export const Group: FC<Props> = ({ name, children }) => {
  const bgcolor = useGroupBgcolor();
  return (
    <Subgraph
      id={`cluster_${name}`}
      label={name}
      bgcolor={bgcolor}
      style="rounded"
      labeljust="l"
      pencolor="#AEB6BE"
      fontcolor="#AEB6BE"
      fontname="Sans-Serif"
      fontsize="12"
    >
      {children}
    </Subgraph>
  );
};

Group.displayName = 'Group';
Group.propTypes = {
  name: t.string.isRequired,
};
