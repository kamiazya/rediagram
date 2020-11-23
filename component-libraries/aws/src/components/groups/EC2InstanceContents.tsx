import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type EC2InstanceContentsProps = {
  title?: string;
};

function resolveImage(): string {
  return resolveAsset('groups/EC2InstanceContents.png');
}

export const EC2InstanceContents: FC<EC2InstanceContentsProps> = ({ title, children }) => {
  useAssertProvider();
  const icon = resolveImage();
  return (
    <Group
      name="ec2_instance_contents"
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

EC2InstanceContents.displayName = 'EC2InstanceContents';
