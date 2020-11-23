import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type SpotFleetProps = {
  title?: string;
};

function resolveImage(): string {
  return resolveAsset('groups/SpotFleet.png');
}

export const SpotFleet: FC<SpotFleetProps> = ({ title, children }) => {
  useAssertProvider();
  const icon = resolveImage();
  return (
    <Group
      name="spot_fleet"
      font={{ color: '#D86613', size: 12 }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>{title ?? 'EC2 instance contents'}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'l',
      }}
      border={{ color: '#D86613' }}
    >
      {children}
    </Group>
  );
};

SpotFleet.displayName = 'SpotFleet';
