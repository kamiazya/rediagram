import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type TransferFamilyType = 'FTPS' | 'SFTP' | 'FTP';

function resolveImage(type?: TransferFamilyType): string {
  switch (type) {
    case 'FTPS':
      return resolve(__dirname, '../../../assets/management-governance/TransferFamily/FTPS.png');
    case 'SFTP':
      return resolve(__dirname, '../../../assets/management-governance/TransferFamily/SFTP.png');
    case 'FTP':
      return resolve(__dirname, '../../../assets/management-governance/TransferFamily/FTP.png');
    default:
      return resolve(__dirname, '../../../assets/management-governance/TransferFamily.png');
  }
}

function useIcon(type?: TransferFamilyType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type TransferFamilyProps = {
  type?: TransferFamilyType;
  name: string;
} & HasDependences;

export const TransferFamily: FC<TransferFamilyProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
