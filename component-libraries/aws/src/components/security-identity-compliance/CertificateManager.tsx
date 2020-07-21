import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type CertificateManagerType = 'Certificate authority';

function resolveImage(type?: CertificateManagerType): string {
  switch (type) {
    case 'Certificate authority':
      return resolve(
        __dirname,
        '../../../assets/security-identity-compliance/CertificateManager/Certificate-authority.png',
      );
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/CertificateManager.png');
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
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
