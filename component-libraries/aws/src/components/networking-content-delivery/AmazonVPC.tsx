import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

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
      return resolve(__dirname, '../../../assets/networking-content-delivery/Customer-gateway.png');
    case 'Internet gateway':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Internet-gateway.png');
    case 'Elastic network interface':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Elastic-network-interface.png');
    case 'Elastic network adapter':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Elastic-network-adapter.png');
    case 'Endpoints':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Endpoints.png');
    case 'Router':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Router.png');
    case 'Traffic mirroring':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Traffic-mirroring.png');
    case 'NAT gateway':
      return resolve(__dirname, '../../../assets/networking-content-delivery/NAT-gateway.png');
    case 'VPN gateway':
      return resolve(__dirname, '../../../assets/networking-content-delivery/VPN-gateway.png');
    case 'Flow logs':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Flow-logs.png');
    case 'Network access control list':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Network-access-control-list.png');
    case 'VPN connection':
      return resolve(__dirname, '../../../assets/networking-content-delivery/VPN-connection.png');
    case 'Peering connection':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Peering-connection.png');
    default:
      return resolve(__dirname, '../../../assets/networking-content-delivery/AmazonVPC.png');
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
} & HasDependences;

export const AmazonVPC: FC<AmazonVPCProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
