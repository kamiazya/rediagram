import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';

export type GCPGroupProps = {
  title: string;
  description?: string;
  fillcolor: string;
  color?: string;
  style?: 'filled';
  borderStyle?: 'dashed';
};

export const GCPGroup: FC<GCPGroupProps> = ({ title, description, fillcolor, color, style, borderStyle, children }) => {
  useAssertProvider();
  return (
    <Group
      name="gcp"
      font={{ color: '#9E9E9E', size: 12 }}
      border={{ color, style: borderStyle }}
      background={{ color: fillcolor, style }}
      label={{
        loc: 't',
        just: 'l',
        content: (
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
        ),
      }}
      margin={10}
    >
      {children}
    </Group>
  );
};

GCPGroup.displayName = 'GCPGroup';

GCPGroup.defaultProps = {
  color: '#E3F2FD',
};
