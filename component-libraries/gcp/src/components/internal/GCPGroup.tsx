import React, { FC, useMemo } from 'react';
import { Subgraph, DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';

export type GCPGroupProps = {
  title: string;
  description?: string;
  fillcolor: string;
  color?: string;
  style?: string;
};

let groupID = 0;

export const GCPGroup: FC<GCPGroupProps> = ({ title, description, fillcolor, color, style, children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    groupID += 1;
    return groupID;
  }, []);
  return (
    <Subgraph
      id={`cluster_gcp_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="l"
      color={color}
      margin={10}
      fontcolor="#9E9E9E"
      fillcolor={fillcolor}
      style={style}
      label={
        <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <DOT.TR>
            <DOT.TD>{title}</DOT.TD>
          </DOT.TR>
          {description && (
            <DOT.TR>
              <DOT.TD>{description}</DOT.TD>
            </DOT.TR>
          )}
        </DOT.TABLE>
      }
    >
      {children}
    </Subgraph>
  );
};

GCPGroup.displayName = 'GCPGroup';

GCPGroup.defaultProps = {
  style: 'filled',
  color: '#E3F2FD',
};
