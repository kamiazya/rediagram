import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { Node, DOT } from '@ts-graphviz/react';
import { HasDependences, Dependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type AWSGeneralIconType =
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

function resolveImage(type: AWSGeneralIconType): string {
  switch (type) {
    case 'Client':
      return resolve(__dirname, '../../../assets/general/Client.png');
    case 'Database':
      return resolve(__dirname, '../../../assets/general/Database.png');
    case 'Disk':
      return resolve(__dirname, '../../../assets/general/Disk.png');
    case 'Firewall':
      return resolve(__dirname, '../../../assets/general/Firewall.png');
    case 'Forums':
      return resolve(__dirname, '../../../assets/general/Forums.png');
    case 'Internet alt1':
      return resolve(__dirname, '../../../assets/general/Internet-alt1.png');
    case 'Internet alt2':
      return resolve(__dirname, '../../../assets/general/Internet-alt2.png');
    case 'Internet gateway':
      return resolve(__dirname, '../../../assets/general/Internet-gateway.png');
    case 'Mobile client':
      return resolve(__dirname, '../../../assets/general/Mobile-client.png');
    case 'Multimedia':
      return resolve(__dirname, '../../../assets/general/Multimedia.png');
    case 'Office building':
      return resolve(__dirname, '../../../assets/general/Office-building.png');
    case 'SAML token':
      return resolve(__dirname, '../../../assets/general/SAML-token.png');
    case 'SDK':
      return resolve(__dirname, '../../../assets/general/SDK.png');
    case 'SSL padlock':
      return resolve(__dirname, '../../../assets/general/SSL-padlock.png');
    case 'Tape storage':
      return resolve(__dirname, '../../../assets/general/Tape-storage.png');
    case 'Toolkit':
      return resolve(__dirname, '../../../assets/general/Toolkit.png');
    case 'Traditional server':
      return resolve(__dirname, '../../../assets/general/Traditional-server.png');
    case 'User':
      return resolve(__dirname, '../../../assets/general/User.png');
    case 'Users':
      return resolve(__dirname, '../../../assets/general/Users.png');
    case 'General':
    default:
      return resolve(__dirname, '../../../assets/general/General.png');
  }
}

function useIcon(type: AWSGeneralIconType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === 'General' ? 56 : 37,
    };
  }, [type]);
}

export type AWSGeneralIconProps = {
  type: AWSGeneralIconType;
  name: string;
} & HasDependences;

export const AWSGeneralIcon: FC<AWSGeneralIconProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <>
      <Node
        id={name}
        shape="box"
        fixedsize
        width={1}
        height={1}
        penwidth={0} // disable border
        margin={0}
        label={
          <DOT.TABLE BORDER={0} CELLBORDER={0}>
            <DOT.TR>
              <DOT.TD WIDTH={icon.size} HEIGHT={icon.size} FIXEDSIZE>
                <DOT.IMG SRC={icon.path} />
              </DOT.TD>
            </DOT.TR>
            <DOT.TR>
              <DOT.TD>{label}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      />
      <Dependences origin={name} upstream={upstream} downstream={downstream} />
    </>
  );
};

AWSGeneralIcon.displayName = 'GeneralIcon';
