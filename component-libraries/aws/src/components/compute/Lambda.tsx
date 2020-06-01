import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { Node, Edge, ClusterPortal, DOT } from '@ts-graphviz/react';
import t from 'prop-types';
import { useAssertProvider } from '../../hooks/assert-provider';

type Props = {
  type?: Type;
  name: string;
  upstream?: string[];
};

type Type = 'Lambda Function';

function resolveImage(type?: Type): string {
  switch (type) {
    case 'Lambda Function':
      return resolve(__dirname, '../../../assets/compute/Lambda/Lambda-Function.png');
    default:
      return resolve(__dirname, '../../../assets/compute/Lambda.png');
  }
}

function useIcon(type?: Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const Lambda: FC<Props> = ({ type, name, upstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  return (
    <>
      <Node
        id={name}
        shape="box"
        fixedsize
        width={1}
        height={1}
        penwidth={0} // disable border
        margin={0}
        label={
          <DOT.TABLE BORDER={0} CELLBORDER={0}>
            <DOT.TR>
              <DOT.TD WIDTH={icon.size} HEIGHT={icon.size} FIXEDSIZE>
                <DOT.IMG SRC={icon.path} />
              </DOT.TD>
            </DOT.TR>
            <DOT.TR>
              <DOT.TD>{name}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      />
      <ClusterPortal>
        {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
      </ClusterPortal>
    </>
  );
};

Lambda.displayName = 'EC2';
Lambda.defaultProps = {
  type: undefined,
  upstream: [],
};

Lambda.propTypes = {
  type: t.oneOf(['Lambda Function']),
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
