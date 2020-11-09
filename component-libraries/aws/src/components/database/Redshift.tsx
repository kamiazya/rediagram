import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type RedshiftCategory = 'analytics' | 'database';
export type RedshiftType = 'Dense compute node' | 'Dense storage node';
export type RedshiftProps = {
  category?: RedshiftCategory;
  type?: RedshiftType;
  name: string;
} & AWSDependences;

function resolveImage(category: RedshiftCategory, type?: RedshiftType): string {
  switch (type) {
    case 'Dense compute node':
      return resolveAsset('', category, '/Redshift/Dense-compute-node.png');
    case 'Dense storage node':
      return resolveAsset('', category, '/Redshift/Dense-storage-node.png');
    default:
      return resolveAsset('', category, '/Redshift.png');
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

export const Redshift: FC<RedshiftProps> = ({
  category = 'database',
  type,
  name,
  children,
  upstream,
  downstream,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon(category, type);
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

Redshift.displayName = 'Redshift';
