import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Certificate Manager');
      default:
        return SubLabel('Certificate Manager');
    }
  }
  return undefined;
}

export const CertificateManager: FC<CertificateManagerProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
