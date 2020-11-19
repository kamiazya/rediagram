import React, { FC, useMemo } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { IP, HasIP } from './internal/IP';

type Type = 'VPC' | 'Private subnet' | 'Public subnet';

type Props = {
  type?: Type;
} & HasIP;

function resolveImage(type?: Type): string {
  switch (type) {
    case 'Private subnet':
      return resolveAsset('groups/VPC/subnet-private.png');
    case 'Public subnet':
      return resolveAsset('groups/VPC/subnet-public.png');
    default:
      return resolveAsset('groups/VPC.png');
  }
}

function resolveBgcolor(type?: Type): string | undefined {
  switch (type) {
    case 'Private subnet':
      return '#007CBC0a';
    case 'Public subnet':
      return '#1D89000a';
    default:
      return 'none';
  }
}

function resolveFontcolor(type?: Type): string | undefined {
  switch (type) {
    case 'Private subnet':
      return '#007CBC';
    case 'Public subnet':
      return '#1D8900';
    default:
      return '#1D8900';
  }
}

function resolveColor(type?: Type): string | undefined {
  switch (type) {
    case 'Private subnet':
    case 'Public subnet':
      return 'none';
    default:
      return '#1D8900';
  }
}

function useStyle(
  type?: Type,
): { fontcolor: string | undefined; bgcolor: string | undefined; color: string | undefined; icon: string } {
  return useMemo(() => {
    return {
      color: resolveColor(type),
      fontcolor: resolveFontcolor(type),
      bgcolor: resolveBgcolor(type),
      icon: resolveImage(type),
    };
  }, [type]);
}

export const VPC: FC<Props> = ({ type, ip, children }) => {
  useAssertProvider();
  const { icon, color, bgcolor, fontcolor } = useStyle(type);
  return (
    <Group
      name="vpc"
      font={{ color: fontcolor, size: 12 }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>{type}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'l',
      }}
      background={{ color: bgcolor }}
      border={{ color }}
    >
      <IP ip={ip}>{children}</IP>
    </Group>
  );
};

VPC.displayName = 'VPC';

VPC.defaultProps = {
  type: 'VPC',
};
