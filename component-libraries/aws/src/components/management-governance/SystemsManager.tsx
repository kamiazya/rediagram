import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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
      return resolveAsset('management-governance/SystemsManager/Automation.png');
    case 'Documents':
      return resolveAsset('management-governance/SystemsManager/Documents.png');
    case 'Patch manager':
      return resolveAsset('management-governance/SystemsManager/Patch-manager.png');
    case 'Parameter store':
      return resolveAsset('management-governance/SystemsManager/Parameter-store.png');
    case 'OpsCenter':
      return resolveAsset('management-governance/SystemsManager/OpsCenter.png');
    case 'Inventory':
      return resolveAsset('management-governance/SystemsManager/Inventory.png');
    case 'Maintenance windows':
      return resolveAsset('management-governance/SystemsManager/Maintenance-windows.png');
    case 'State manager':
      return resolveAsset('management-governance/SystemsManager/State-manager.png');
    case 'Run command':
      return resolveAsset('management-governance/SystemsManager/Run-command.png');
    default:
      return resolveAsset('management-governance/SystemsManager.png');
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
} & AWSDependences;

export const SystemsManager: FC<SystemsManagerProps> = ({
  type,
  name,
  upstream,
  downstream,
  children,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};
