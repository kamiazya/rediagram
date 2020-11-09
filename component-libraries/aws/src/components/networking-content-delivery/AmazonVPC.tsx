import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const AmazonVPC: FC<AmazonVPCProps> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};
