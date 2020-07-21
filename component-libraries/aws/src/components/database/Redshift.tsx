import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type RedshiftProps = {
  category?: RedshiftCategory;
  type?: RedshiftType;
  name: string;
} & HasDependences;

export type RedshiftCategory = 'analytics' | 'database';
export type RedshiftType = 'Dense compute node' | 'Dense storage node';

function resolveImage(category: RedshiftCategory, type?: RedshiftType): string {
  switch (type) {
    case 'Dense compute node':
      return resolve(__dirname, '../../../assets/', category, '/Redshift/Dense-compute-node.png');
    case 'Dense storage node':
      return resolve(__dirname, '../../../assets/', category, '/Redshift/Dense-storage-node.png');
    default:
      return resolve(__dirname, '../../../assets/', category, '/Redshift.png');
  }
}

function useIcon(category: RedshiftCategory, type?: RedshiftType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category, type),
      size: type === undefined ? 56 : 37,
    };
  }, [category, type]);
}

export const Redshift: FC<RedshiftProps> = ({ category = 'database', type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(category, type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Redshift.displayName = 'Redshift';
