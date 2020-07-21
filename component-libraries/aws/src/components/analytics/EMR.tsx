import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type EMRProps = {
  type?: EMRType;
  name: string;
} & HasDependences;

export type EMRType =
  | 'HDFS cluster'
  | 'Cluster'
  | 'EMR engine'
  | 'EMR engine mapR M3'
  | 'EMR engine mapR M5'
  | 'EMR engine mapR M7';

function resolveImage(type?: EMRType): string {
  switch (type) {
    case 'HDFS cluster':
      return resolve(__dirname, '../../../assets/analytics/EMR/HDFS-cluster.png');
    case 'Cluster':
      return resolve(__dirname, '../../../assets/analytics/EMR/Cluster.png');
    case 'EMR engine':
      return resolve(__dirname, '../../../assets/analytics/EMR/EMR-engine.png');
    case 'EMR engine mapR M3':
      return resolve(__dirname, '../../../assets/analytics/EMR/EMR-engine-mapR-M3.png');
    case 'EMR engine mapR M5':
      return resolve(__dirname, '../../../assets/analytics/EMR/EMR-engine-mapR-M5.png');
    case 'EMR engine mapR M7':
      return resolve(__dirname, '../../../assets/analytics/EMR/EMR-engine-mapR-M7.png');
    default:
      return resolve(__dirname, '../../../assets/analytics/EMR.png');
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

export const EMR: FC<EMRProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

EMR.displayName = 'EMR';
