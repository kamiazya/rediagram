import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type AmazonVPCType =
  | 'Customer gateway'
  | 'Internet gateway'
  | 'Elastic network interface'
  | 'Elastic network adapter'
  | 'Endpoints'
  | 'Router'
  | 'Traffic mirroring'
  | 'NAT gateway'
  | 'VPN gateway'
  | 'Flow logs'
  | 'Network access control list'
  | 'VPN connection'
  | 'Peering connection';

function resolveImage(type?: AmazonVPCType): string {
  switch (type) {
    case 'Customer gateway':
      return resolveAsset('networking-content-delivery/AmazonVPC/Customer-gateway.png');
    case 'Internet gateway':
      return resolveAsset('networking-content-delivery/AmazonVPC/Internet-gateway.png');
    case 'Elastic network interface':
      return resolveAsset('networking-content-delivery/AmazonVPC/Elastic-network-interface.png');
    case 'Elastic network adapter':
      return resolveAsset('networking-content-delivery/AmazonVPC/Elastic-network-adapter.png');
    case 'Endpoints':
      return resolveAsset('networking-content-delivery/AmazonVPC/Endpoints.png');
    case 'Router':
      return resolveAsset('networking-content-delivery/AmazonVPC/Router.png');
    case 'Traffic mirroring':
      return resolveAsset('networking-content-delivery/AmazonVPC/Traffic-mirroring.png');
    case 'NAT gateway':
      return resolveAsset('networking-content-delivery/AmazonVPC/NAT-gateway.png');
    case 'VPN gateway':
      return resolveAsset('networking-content-delivery/AmazonVPC/VPN-gateway.png');
    case 'Flow logs':
      return resolveAsset('networking-content-delivery/AmazonVPC/Flow-logs.png');
    case 'Network access control list':
      return resolveAsset('networking-content-delivery/AmazonVPC/Network-access-control-list.png');
    case 'VPN connection':
      return resolveAsset('networking-content-delivery/AmazonVPC/VPN-connection.png');
    case 'Peering connection':
      return resolveAsset('networking-content-delivery/AmazonVPC/Peering-connection.png');
    default:
      return resolveAsset('networking-content-delivery/AmazonVPC.png');
  }
}

function useIcon(type?: AmazonVPCType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type AmazonVPCProps = {
  type?: AmazonVPCType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Virtual Private Cloud');
      case 'medium':
        return SubLabel('Amazon VPC');
      default:
        return SubLabel('VPC');
    }
  }
  return undefined;
}

export const AmazonVPC: FC<AmazonVPCProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
