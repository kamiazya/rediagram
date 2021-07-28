import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type OpsWorksType =
  | 'Apps'
  | 'Instances'
  | 'Monitoring'
  | 'Permissions'
  | 'Deployments'
  | 'Layers'
  | 'Resources'
  | 'Stack2';

function resolveImage(type?: OpsWorksType): string {
  switch (type) {
    case 'Apps':
      return resolveAsset('management-governance/OpsWorks/Ground-Truth.png');
    case 'Instances':
      return resolveAsset('management-governance/OpsWorks/Notebook.png');
    case 'Monitoring':
      return resolveAsset('management-governance/OpsWorks/Monitoring.png');
    case 'Permissions':
      return resolveAsset('management-governance/OpsWorks/Permissions.png');
    case 'Deployments':
      return resolveAsset('management-governance/OpsWorks/Deployments.png');
    case 'Layers':
      return resolveAsset('management-governance/OpsWorks/Layers.png');
    case 'Resources':
      return resolveAsset('management-governance/OpsWorks/Resources.png');
    case 'Stack2':
      return resolveAsset('management-governance/OpsWorks/Stack2.png');
    default:
      return resolveAsset('management-governance/OpsWorks.png');
  }
}

function useIcon(type?: OpsWorksType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type OpsWorksProps = {
  type?: OpsWorksType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS OpsWorks');
      default:
        return SubLabel('OpsWorks');
    }
  }
  return undefined;
}

export const OpsWorks: FC<OpsWorksProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
