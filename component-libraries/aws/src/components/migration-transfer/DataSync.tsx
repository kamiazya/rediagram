import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type DataSyncType = 'Agent';

function resolveImage(type?: DataSyncType): string {
  switch (type) {
    case 'Agent':
      return resolveAsset('management-governance/DataSync/Agent.png');
    default:
      return resolveAsset('management-governance/DataSync.png');
  }
}

function useIcon(type?: DataSyncType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type DataSyncProps = {
  type?: DataSyncType;
  name: string;
} & HasDependences;

export const DataSync: FC<DataSyncProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
