import { resolve } from 'path';
import React, { FC, useMemo, isValidElement } from 'react';
import { Node, Edge, ClusterPortal, DOT } from '@ts-graphviz/react';
import t from 'prop-types';
import { useAssertProvider } from '../../hooks/assert-provider';

type Props = {
  type?: Type;
  name: string;
  upstream?: string[];
};

type Type = 'Bucket with Objects' | 'Bucket' | 'Object';

function resolveImage(type?: Type): string {
  switch (type) {
    case 'Bucket with Objects':
      return resolve(__dirname, '../../../assets/storage/S3/Bucket-with-Objects.png');
    case 'Bucket':
      return resolve(__dirname, '../../../assets/storage/S3/Bucket.png');
    case 'Object':
      return resolve(__dirname, '../../../assets/storage/S3/Object.png');
    default:
      return resolve(__dirname, '../../../assets/storage/S3.png');
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

export const S3: FC<Props> = ({ type, name, upstream, children }) => {
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
              <DOT.TD>{isValidElement(children) || typeof children === 'string' ? children : name}</DOT.TD>
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

S3.displayName = 'S3';
S3.defaultProps = {
  type: undefined,
  upstream: [],
};

S3.propTypes = {
  type: t.oneOf<Type>(['Bucket with Objects', 'Bucket', 'Object']),
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
};
