import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type S3GlacierProps = {
  type?: S3GlacierType;
  name: string;
} & HasDependences;

export type S3GlacierType = 'Vault' | 'Archive';

function resolveImage(type?: S3GlacierType): string {
  switch (type) {
    case 'Vault':
      return resolve(__dirname, '../../../assets/storage/S3Glacier/Vault.png');
    case 'Archive':
      return resolve(__dirname, '../../../assets/storage/S3Glacier/Archive.png');
    default:
      return resolve(__dirname, '../../../assets/storage/S3Glacier.png');
  }
}

function useIcon(type?: S3GlacierType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const S3Glacier: FC<S3GlacierProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

S3Glacier.displayName = 'S3Glacier';
