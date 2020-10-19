import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../assets';

export type GeneralIconType =
  | 'Client'
  | 'Database'
  | 'Disk'
  | 'Firewall'
  | 'Forums'
  | 'General'
  | 'Internet alt1'
  | 'Internet alt2'
  | 'Internet gateway'
  | 'Mobile client'
  | 'Multimedia'
  | 'Office building'
  | 'SAML token'
  | 'SDK'
  | 'SSL padlock'
  | 'Tape storage'
  | 'Toolkit'
  | 'Traditional server'
  | 'User'
  | 'Users';

function resolveImage(type: GeneralIconType): string {
  switch (type) {
    case 'Client':
      return resolveAsset('general/Client.png');
    case 'Database':
      return resolveAsset('general/Database.png');
    case 'Disk':
      return resolveAsset('general/Disk.png');
    case 'Firewall':
      return resolveAsset('general/Firewall.png');
    case 'Forums':
      return resolveAsset('general/Forums.png');
    case 'Internet alt1':
      return resolveAsset('general/Internet-alt1.png');
    case 'Internet alt2':
      return resolveAsset('general/Internet-alt2.png');
    case 'Internet gateway':
      return resolveAsset('general/Internet-gateway.png');
    case 'Mobile client':
      return resolveAsset('general/Mobile-client.png');
    case 'Multimedia':
      return resolveAsset('general/Multimedia.png');
    case 'Office building':
      return resolveAsset('general/Office-building.png');
    case 'SAML token':
      return resolveAsset('general/SAML-token.png');
    case 'SDK':
      return resolveAsset('general/SDK.png');
    case 'SSL padlock':
      return resolveAsset('general/SSL-padlock.png');
    case 'Tape storage':
      return resolveAsset('general/Tape-storage.png');
    case 'Toolkit':
      return resolveAsset('general/Toolkit.png');
    case 'Traditional server':
      return resolveAsset('general/Traditional-server.png');
    case 'User':
      return resolveAsset('general/User.png');
    case 'Users':
      return resolveAsset('general/Users.png');
    case 'General':
    default:
      return resolveAsset('general/General.png');
  }
}

function useIcon(type: GeneralIconType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === 'General' ? 56 : 37,
    };
  }, [type]);
}

export type GeneralIconProps = {
  type: GeneralIconType;
  name: string;
} & HasDependences;

export const GeneralIcon: FC<GeneralIconProps> = ({ type, name, children, upstream, downstream }) => {
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

GeneralIcon.displayName = 'GeneralIcon';
