import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { Subgraph, DOT } from '@ts-graphviz/react';
import t from 'prop-types';
import { useAssertProvider } from '../../hooks/assert-provider';

let securityGroupID = 0;

type Props = {
  type?: Type;
};

type Type = 'VPC' | 'Private subnet' | 'Public subnet';

function resolveImage(type?: Type): string {
  switch (type) {
    case 'Private subnet':
      return resolve(__dirname, '../../../assets/groups/VPC/subnet-private.png');
    case 'Public subnet':
      return resolve(__dirname, '../../../assets/groups/VPC/subnet-public.png');
    default:
      return resolve(__dirname, '../../../assets/groups/VPC.png');
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

export const VPC: FC<Props> = ({ type, children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    securityGroupID += 1;
    return securityGroupID;
  }, []);
  const { icon, color, bgcolor, fontcolor } = useStyle(type);
  return (
    <Subgraph
      id={`cluster_vpc_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="l"
      color={color}
      bgcolor={bgcolor}
      fontcolor={fontcolor}
      label={
        <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <DOT.TR>
            <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
              <DOT.IMG SRC={icon} />
            </DOT.TD>
            <DOT.TD>{type}</DOT.TD>
          </DOT.TR>
        </DOT.TABLE>
      }
    >
      {children}
    </Subgraph>
  );
};

VPC.displayName = 'VPC';

VPC.defaultProps = {
  type: 'VPC',
};

VPC.propTypes = {
  type: t.oneOf<Type>(['VPC', 'Private subnet', 'Public subnet']),
};
