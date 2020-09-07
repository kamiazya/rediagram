import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

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

export type IAMProps = {
  type?: IAMType;
  name: string;
} & HasDependences;

function resolveImage(type?: IAMType): string {
  switch (type) {
    case 'Add-on':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Add-on.png');
    case 'AWS STS Alternate':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/AWS-STS-Alternate.png');
    case 'AWS STS':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/AWS-STS.png');
    case 'Data Encryption Key':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Data-Encryption-Key.png');
    case 'Encrypted Data':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Encrypted-Data.png');
    case 'Long term Security Credential':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Long-term-Security-Credential.png');
    case 'MFA Token':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/MFA-Token.png');
    case 'Permissions':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Permissions.png');
    case 'Role':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Role.png');
    case 'Temporary Security Credential':
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM/Temporary-Security-Credential.png');
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/IAM.png');
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
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

IAM.displayName = 'IAM';
