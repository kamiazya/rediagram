import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';

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
      return resolve(__dirname, '../../assets/general/Client.png');
    case 'Database':
      return resolve(__dirname, '../../assets/general/Database.png');
    case 'Disk':
      return resolve(__dirname, '../../assets/general/Disk.png');
    case 'Firewall':
      return resolve(__dirname, '../../assets/general/Firewall.png');
    case 'Forums':
      return resolve(__dirname, '../../assets/general/Forums.png');
    case 'Internet alt1':
      return resolve(__dirname, '../../assets/general/Internet-alt1.png');
    case 'Internet alt2':
      return resolve(__dirname, '../../assets/general/Internet-alt2.png');
    case 'Internet gateway':
      return resolve(__dirname, '../../assets/general/Internet-gateway.png');
    case 'Mobile client':
      return resolve(__dirname, '../../assets/general/Mobile-client.png');
    case 'Multimedia':
      return resolve(__dirname, '../../assets/general/Multimedia.png');
    case 'Office building':
      return resolve(__dirname, '../../assets/general/Office-building.png');
    case 'SAML token':
      return resolve(__dirname, '../../assets/general/SAML-token.png');
    case 'SDK':
      return resolve(__dirname, '../../assets/general/SDK.png');
    case 'SSL padlock':
      return resolve(__dirname, '../../assets/general/SSL-padlock.png');
    case 'Tape storage':
      return resolve(__dirname, '../../assets/general/Tape-storage.png');
    case 'Toolkit':
      return resolve(__dirname, '../../assets/general/Toolkit.png');
    case 'Traditional server':
      return resolve(__dirname, '../../assets/general/Traditional-server.png');
    case 'User':
      return resolve(__dirname, '../../assets/general/User.png');
    case 'Users':
      return resolve(__dirname, '../../assets/general/Users.png');
    case 'General':
    default:
      return resolve(__dirname, '../../assets/general/General.png');
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
