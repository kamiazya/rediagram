import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

const icon = resolveAsset('groups/auto_scaling_group.png');

export const AutoScalingGroup: FC = ({ children }) => {
  useAssertProvider();
  return (
    <Group
      name="auto_scaling_group"
      font={{ color: '#D86613', size: 12 }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
            </DOT.TR>
            <DOT.TR>
              <DOT.TD>Auto Scaling group</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'c',
      }}
      border={{ color: '#D86613', style: 'dashed' }}
    >
      {children}
    </Group>
  );
};

AutoScalingGroup.displayName = 'AutoScalingGroup';
