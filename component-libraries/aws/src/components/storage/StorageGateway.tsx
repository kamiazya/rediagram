import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type StorageGatewayType =
  | 'Non-cached volume'
  | 'Cached volume'
  | 'Volume gateway'
  | 'Virtual tape library'
  | 'Tape gateway'
  | 'File gateway';

export type StorageGatewayProps = {
  type?: StorageGatewayType;
  name: string;
} & HasDependences;

function resolveImage(type?: StorageGatewayType): string {
  switch (type) {
    case 'Non-cached volume':
      return resolve(__dirname, '../../../assets/storage/StorageGateway/Non-cached-volume.png');
    case 'Cached volume':
      return resolve(__dirname, '../../../assets/storage/StorageGateway/Cached-volume.png');
    case 'Volume gateway':
      return resolve(__dirname, '../../../assets/storage/StorageGateway/Volume-gateway.png');
    case 'Virtual tape library':
      return resolve(__dirname, '../../../assets/storage/StorageGateway/Virtual-tape-library.png');
    case 'Tape gateway':
      return resolve(__dirname, '../../../assets/storage/StorageGateway/Tape-gateway.png');
    case 'File gateway':
      return resolve(__dirname, '../../../assets/storage/StorageGateway/File-gateway.png');
    default:
      return resolve(__dirname, '../../../assets/storage/StorageGateway.png');
  }
}

function useIcon(type?: StorageGatewayType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const StorageGateway: FC<StorageGatewayProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

StorageGateway.displayName = 'StorageGateway';
