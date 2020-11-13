import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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
} & AWSDependences;

function resolveImage(type?: StorageGatewayType): string {
  switch (type) {
    case 'Non-cached volume':
      return resolveAsset('storage/StorageGateway/Non-cached-volume.png');
    case 'Cached volume':
      return resolveAsset('storage/StorageGateway/Cached-volume.png');
    case 'Volume gateway':
      return resolveAsset('storage/StorageGateway/Volume-gateway.png');
    case 'Virtual tape library':
      return resolveAsset('storage/StorageGateway/Virtual-tape-library.png');
    case 'Tape gateway':
      return resolveAsset('storage/StorageGateway/Tape-gateway.png');
    case 'File gateway':
      return resolveAsset('storage/StorageGateway/File-gateway.png');
    default:
      return resolveAsset('storage/StorageGateway.png');
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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Storage Gateway');
      default:
        return SubLabel('Storage Gateway');
    }
  }
  return undefined;
}

export const StorageGateway: FC<StorageGatewayProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

StorageGateway.displayName = 'StorageGateway';
