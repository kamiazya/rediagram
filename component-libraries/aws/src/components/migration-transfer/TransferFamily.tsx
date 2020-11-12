import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type TransferFamilyType = 'FTPS' | 'SFTP' | 'FTP';

function resolveImage(type?: TransferFamilyType): string {
  switch (type) {
    case 'FTPS':
      return resolveAsset('management-governance/TransferFamily/FTPS.png');
    case 'SFTP':
      return resolveAsset('management-governance/TransferFamily/SFTP.png');
    case 'FTP':
      return resolveAsset('management-governance/TransferFamily/FTP.png');
    default:
      return resolveAsset('management-governance/TransferFamily.png');
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
} & AWSDependences;

export const TransferFamily: FC<TransferFamilyProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};
