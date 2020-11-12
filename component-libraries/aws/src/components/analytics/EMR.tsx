import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';

export type EMRType =
  | 'HDFS cluster'
  | 'Cluster'
  | 'EMR engine'
  | 'EMR engine mapR M3'
  | 'EMR engine mapR M5'
  | 'EMR engine mapR M7';

export type EMRProps = {
  type?: EMRType;
  name: string;
} & AWSDependences;

function resolveImage(type?: EMRType): string {
  switch (type) {
    case 'HDFS cluster':
      return resolveAsset('analytics/EMR/HDFS-cluster.png');
    case 'Cluster':
      return resolveAsset('analytics/EMR/Cluster.png');
    case 'EMR engine':
      return resolveAsset('analytics/EMR/EMR-engine.png');
    case 'EMR engine mapR M3':
      return resolveAsset('analytics/EMR/EMR-engine-mapR-M3.png');
    case 'EMR engine mapR M5':
      return resolveAsset('analytics/EMR/EMR-engine-mapR-M5.png');
    case 'EMR engine mapR M7':
      return resolveAsset('analytics/EMR/EMR-engine-mapR-M7.png');
    default:
      return resolveAsset('analytics/EMR.png');
  }
}

function useIcon(type?: EMRType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const EMR: FC<EMRProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

EMR.displayName = 'EMR';
