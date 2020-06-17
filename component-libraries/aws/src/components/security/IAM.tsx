import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { Node, DOT } from '@ts-graphviz/react';
import { HasDependences, Dependences, useLabelText } from 'rediagram';
import { useAssertProvider } from '../../hooks/assert-provider';

export type IAMProps = {
  type?: IAMType;
  name: string;
} & HasDependences;

export type IAMType =
  | 'Add-on'
  | 'AWS STS Alternate'
  | 'AWS STS'
  | 'Data Encryption Key'
  | 'Encrypted Data'
  | 'Long term Security Credential'
  | 'MFA Token'
  | 'Permissions'
  | 'Role'
  | 'Temporary Security Credential';

function resolveImage(type?: IAMType): string {
  switch (type) {
    case 'Add-on':
      return resolve(__dirname, '../../../assets/security/IAM/Add-on.png');
    case 'AWS STS Alternate':
      return resolve(__dirname, '../../../assets/security/IAM/AWS-STS-Alternate.png');
    case 'AWS STS':
      return resolve(__dirname, '../../../assets/security/IAM/AWS-STS.png');
    case 'Data Encryption Key':
      return resolve(__dirname, '../../../assets/security/IAM/Data-Encryption-Key.png');
    case 'Encrypted Data':
      return resolve(__dirname, '../../../assets/security/IAM/Encrypted-Data.png');
    case 'Long term Security Credential':
      return resolve(__dirname, '../../../assets/security/IAM/Long-term-Security-Credential.png');
    case 'MFA Token':
      return resolve(__dirname, '../../../assets/security/IAM/MFA-Token.png');
    case 'Permissions':
      return resolve(__dirname, '../../../assets/security/IAM/Permissions.png');
    case 'Role':
      return resolve(__dirname, '../../../assets/security/IAM/Role.png');
    case 'Temporary Security Credential':
      return resolve(__dirname, '../../../assets/security/IAM/Temporary-Security-Credential.png');
    default:
      return resolve(__dirname, '../../../assets/security/IAM.png');
  }
}

function useIcon(type?: IAMType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const IAM: FC<IAMProps> = ({ type, name, children, upstream, downstream }) => {
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

IAM.displayName = 'IAM';
