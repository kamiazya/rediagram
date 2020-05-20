import React, { FC } from 'react';
import { attribute } from 'ts-graphviz';
import { Subgraph } from '@ts-graphviz/react';
import t from 'prop-types';
import { useGroupBgcolor } from '../hooks/group-bgcolor';

type Props = {
  name: string;
};

// __bgcolors = ("#E5F5FD", "#EBF3E7", "#ECE8F6", "#FDF7E3")

export const Group: FC<Props> = ({ name, children }) => {
  const bgcolor = useGroupBgcolor();
  return (
    <Subgraph
      id={`cluster_${name}`}
      label={name}
      bgcolor={bgcolor}
      graph={{
        [attribute.style]: 'rounded',
        [attribute.labeljust]: 'l',
        [attribute.pencolor]: '#AEB6BE',
        [attribute.fontname]: 'Sans-Serif',
        [attribute.fontsize]: '12',
      }}
      node={{
        [attribute.shape]: 'box',
      }}
    >
      {children}
    </Subgraph>
  );
};

Group.displayName = 'Group';
Group.propTypes = {
  name: t.string.isRequired,
};
