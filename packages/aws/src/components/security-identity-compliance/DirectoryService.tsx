import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type DirectoryServiceType = 'Simple AD' | 'AD Connector' | 'AWS Managed Microsoft AD';

export type DirectoryServiceProps = {
  type?: DirectoryServiceType;
  name: string;
} & AWSDependences;

function resolveImage(type?: DirectoryServiceType): string {
  switch (type) {
    case 'Simple AD':
      return resolveAsset('security-identity-compliance/DirectoryService/Simple-AD.png');
    case 'AD Connector':
      return resolveAsset('security-identity-compliance/DirectoryService/AD-Connector.png');
    case 'AWS Managed Microsoft AD':
      return resolveAsset('security-identity-compliance/DirectoryService/AWS-Managed-Microsoft-AD.png');
    default:
      return resolveAsset('security-identity-compliance/DirectoryService.png');
  }
}

function useIcon(type?: DirectoryServiceType): { path: string; size: number } {
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
        return SubLabel('AWS Managed Microsoft Active Directory');
      default:
        return SubLabel('AD');
    }
  }
  return undefined;
}

export const DirectoryService: FC<DirectoryServiceProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

DirectoryService.displayName = 'DirectoryService';
