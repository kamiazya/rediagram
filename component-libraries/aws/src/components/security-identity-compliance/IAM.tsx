import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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
} & AWSDependences;

function resolveImage(type?: IAMType): string {
  switch (type) {
    case 'Add-on':
      return resolveAsset('security-identity-compliance/IAM/Add-on.png');
    case 'AWS STS Alternate':
      return resolveAsset('security-identity-compliance/IAM/AWS-STS-Alternate.png');
    case 'AWS STS':
      return resolveAsset('security-identity-compliance/IAM/AWS-STS.png');
    case 'Data Encryption Key':
      return resolveAsset('security-identity-compliance/IAM/Data-Encryption-Key.png');
    case 'Encrypted Data':
      return resolveAsset('security-identity-compliance/IAM/Encrypted-Data.png');
    case 'Long term Security Credential':
      return resolveAsset('security-identity-compliance/IAM/Long-term-Security-Credential.png');
    case 'MFA Token':
      return resolveAsset('security-identity-compliance/IAM/MFA-Token.png');
    case 'Permissions':
      return resolveAsset('security-identity-compliance/IAM/Permissions.png');
    case 'Role':
      return resolveAsset('security-identity-compliance/IAM/Role.png');
    case 'Temporary Security Credential':
      return resolveAsset('security-identity-compliance/IAM/Temporary-Security-Credential.png');
    default:
      return resolveAsset('security-identity-compliance/IAM.png');
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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Identity and Access Management');
      case 'medium':
        return SubLabel('Identity and Access Management');
      default:
        return SubLabel('IAM');
    }
  }
  return undefined;
}

export const IAM: FC<IAMProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

IAM.displayName = 'IAM';
