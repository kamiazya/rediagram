import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type ServerContentsProps = {
  title?: string;
};

function resolveImage(): string {
  return resolveAsset('groups/ServerContents.png');
}

export const ServerContents: FC<ServerContentsProps> = ({ title, children }) => {
  useAssertProvider();
  const icon = resolveImage();
  return (
    <Group
      name="server_contents"
      font={{ color: '#5A6B86', size: 12 }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>{title ?? 'Server Contents'}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'l',
      }}
      border={{ color: '#5A6B86' }}
    >
      {children}
    </Group>
  );
};

ServerContents.displayName = 'ServerContents';
