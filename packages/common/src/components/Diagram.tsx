import React, { FC } from 'react';
import { Digraph } from '@ts-graphviz/react';
import { attribute } from 'ts-graphviz';
import t from 'prop-types';

type Props = {
  dpi?: number;
  rankdir?: 'TB' | 'BT' | 'RL' | 'LR';
};

export const Diagram: FC<Props> = ({ children, dpi, rankdir }) => {
  return (
    <Digraph
      dpi={dpi}
      rankdir={rankdir}
      pad={1.0}
      splines="ortho"
      nodesep={0.6}
      ranksep={0.7}
      fontname="Sans-Serif"
      fontsize={15}
      fontcolor="#2D3436"
      node={{
        [attribute.shape]: 'box',
        [attribute.style]: 'rounded',
        [attribute.fixedsize]: true,
        [attribute.width]: 1.4,
        [attribute.height]: 1.4,
        [attribute.labelloc]: 'b',
        [attribute.imagescale]: true,
        [attribute.fontname]: 'Sans-Serif',
        [attribute.fontsize]: 13,
        [attribute.fontcolor]: '#2D3436',
      }}
      edge={{
        [attribute.color]: '#7B8894',
        [attribute.fontname]: 'Sans-Serif',
        [attribute.fontsize]: 13,
        [attribute.fontcolor]: '#2D3436',
      }}
    >
      {children}
    </Digraph>
  );
};

Diagram.propTypes = {
  dpi: t.number,
  rankdir: t.oneOf(['TB', 'BT', 'RL', 'LR']),
};

Diagram.defaultProps = {
  dpi: 150,
  rankdir: undefined,
};
