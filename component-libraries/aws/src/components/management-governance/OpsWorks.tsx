import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

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
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Ground-Truth.png');
    case 'Instances':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Notebook.png');
    case 'Monitoring':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Monitoring.png');
    case 'Permissions':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Permissions.png');
    case 'Deployments':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Deployments.png');
    case 'Layers':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Layers.png');
    case 'Resources':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Resources.png');
    case 'Stack2':
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks/Stack2.png');
    default:
      return resolve(__dirname, '../../../assets/management-governance/OpsWorks.png');
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
} & HasDependences;

export const OpsWorks: FC<OpsWorksProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
