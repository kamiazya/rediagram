import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type CertificateManagerType = 'Certificate authority';

function resolveImage(type?: CertificateManagerType): string {
  switch (type) {
    case 'Certificate authority':
      return resolveAsset('security-identity-compliance/CertificateManager/Certificate-authority.png');
    default:
      return resolveAsset('security-identity-compliance/CertificateManager.png');
  }
}

function useIcon(type?: CertificateManagerType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type CertificateManagerProps = {
  type?: CertificateManagerType;
  name: string;
} & HasDependences;

export const CertificateManager: FC<CertificateManagerProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
