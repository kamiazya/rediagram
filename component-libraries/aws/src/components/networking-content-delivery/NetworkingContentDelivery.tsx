import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type NetworkingContentDeliveryProps = {
  name: string;
} & AWSDependences;

function resolveImage(): string {
  return resolveAsset('networking-content-delivery/NetworkingContentDelivery.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const NetworkingContentDelivery: FC<NetworkingContentDeliveryProps> = ({ name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

NetworkingContentDelivery.displayName = 'NetworkingContentDelivery';
