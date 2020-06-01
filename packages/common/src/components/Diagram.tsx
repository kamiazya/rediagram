import React, { FC, ReactElement } from 'react';
import { Digraph } from '@ts-graphviz/react';
import { attribute } from 'ts-graphviz';
import t from 'prop-types';

type Props = {
  title?: ReactElement | string;
  dpi?: number;
  rankdir?: 'TB' | 'BT' | 'RL' | 'LR';
};

export const Diagram: FC<Props> = ({ title, children, dpi, rankdir }) => {
  return (
    <Digraph
      dpi={dpi}
      rankdir={rankdir}
      pad={1.0}
      splines="ortho"
      nodesep={0.6}
      ranksep={0.7}
      fontname="Sans-Serif"
      fontsize={16}
      fontcolor="#2D3436"
      label={title}
      labelloc="t"
      labeljust="l"
      node={{
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
  // eslint-disable-next-line react/require-default-props
  title: t.oneOfType([t.string.isRequired, t.element.isRequired]),
  dpi: t.number,
  rankdir: t.oneOf(['TB', 'BT', 'RL', 'LR']),
};

Diagram.defaultProps = {
  dpi: 150,
  rankdir: 'LR',
};
