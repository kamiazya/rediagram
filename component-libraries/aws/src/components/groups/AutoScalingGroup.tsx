import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { Subgraph, DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';

const icon = resolve(__dirname, '../../../assets/groups/auto_scaling_group.png');

let autoScalingGroupID = 0;

export const AutoScalingGroup: FC = ({ children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    autoScalingGroupID += 1;
    return autoScalingGroupID;
  }, []);
  return (
    <Subgraph
      id={`cluster_auto_scaling_group_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="c"
      color="#D86613"
      fontcolor="#D86613"
      style="dashed"
      label={
        <DOT.TABLE BORDER="0" CELLBORDER="0">
          <DOT.TR>
            <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
              <DOT.IMG SRC={icon} />
            </DOT.TD>
          </DOT.TR>
          <DOT.TR>
            <DOT.TD>Auto Scaling group</DOT.TD>
          </DOT.TR>
        </DOT.TABLE>
      }
    >
      {children}
    </Subgraph>
  );
};

AutoScalingGroup.displayName = 'AutoScalingGroup';
