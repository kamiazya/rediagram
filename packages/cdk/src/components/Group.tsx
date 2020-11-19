import React, { FC, ReactElement, useMemo } from 'react';
import { Subgraph } from '@ts-graphviz/react';

export type GroupProps = {
  name: string;
  background?: {
    color?: string;
    style?: 'filled';
  };
  font?: {
    color?: string;
    size?: number;
  };
  border?: {
    style?: 'dashed' | 'solid' | 'doted';
    color?: string;
  };
  label?: {
    content: string | ReactElement;
    loc?: 't' | 'c' | 'b';
    just?: 'l' | 'c' | 'r';
  };
  margin?: number;
};

let groupID = 0;

function useID(name: string): string {
  return useMemo(() => {
    groupID += 1;
    return `cluster_${name}_${groupID}`;
  }, [name]);
}

export const Group: FC<GroupProps> = ({ name, label, border, font, background, margin, children }) => {
  const id = useID(name);
  const style = [...(background?.style ? [background.style] : []), ...(border?.style ? [border.style] : [])].join(',');
  return (
    <Subgraph
      id={id}
      label={label?.content}
      labeljust={label?.just}
      labelloc={label?.loc}
      color={border?.color}
      fontcolor={font?.color}
      bgcolor={background?.color}
      style={style}
      margin={margin}
      fontsize={font?.size}
    >
      {children}
    </Subgraph>
  );
};
