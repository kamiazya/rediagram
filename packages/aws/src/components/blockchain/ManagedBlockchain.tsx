import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type ManagedBlockchainType = 'Blockchain';

export type ManagedBlockchainProps = {
  type?: ManagedBlockchainType;
  name: string;
} & AWSDependences;

function resolveImage(type?: ManagedBlockchainType): string {
  switch (type) {
    case 'Blockchain':
      return resolveAsset('blockchain/ManagedBlockchain/Blockchain.png');
    default:
      return resolveAsset('blockchain/ManagedBlockchain.png');
  }
}

function useIcon(type?: ManagedBlockchainType): { path: string; size: number } {
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
        return SubLabel('Amazon Managed Blockchain');
      default:
        return SubLabel('Managed Blockchain');
    }
  }
  return undefined;
}

export const ManagedBlockchain: FC<ManagedBlockchainProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ManagedBlockchain.displayName = 'ManagedBlockchain';
