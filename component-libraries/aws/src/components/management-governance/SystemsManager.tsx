import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type SystemsManagerType =
  | 'Automation'
  | 'Documents'
  | 'Patch manager'
  | 'Parameter store'
  | 'OpsCenter'
  | 'Inventory'
  | 'Maintenance windows'
  | 'State manager'
  | 'Run command';

function resolveImage(type?: SystemsManagerType): string {
  switch (type) {
    case 'Automation':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Automation.png');
    case 'Documents':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Documents.png');
    case 'Patch manager':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Patch-manager.png');
    case 'Parameter store':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Parameter-store.png');
    case 'OpsCenter':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/OpsCenter.png');
    case 'Inventory':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Inventory.png');
    case 'Maintenance windows':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Maintenance-windows.png');
    case 'State manager':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/State-manager.png');
    case 'Run command':
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager/Run-command.png');
    default:
      return resolve(__dirname, '../../../assets/management-governance/SystemsManager.png');
  }
}

function useIcon(type?: SystemsManagerType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type SystemsManagerProps = {
  type?: SystemsManagerType;
  name: string;
} & HasDependences;

export const SystemsManager: FC<SystemsManagerProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
