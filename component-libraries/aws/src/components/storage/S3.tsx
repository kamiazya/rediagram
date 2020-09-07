import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type S3Type = 'Bucket with Objects' | 'Bucket' | 'Object';

export type S3Props = {
  type?: S3Type;
  name: string;
} & HasDependences;

function resolveImage(type?: S3Type): string {
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

function useIcon(type?: S3Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const S3: FC<S3Props> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

S3.displayName = 'S3';
