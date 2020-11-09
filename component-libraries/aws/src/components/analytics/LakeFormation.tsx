import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';

export type LakeFormationType = 'Data lake';

export type LakeFormationProps = {
  type?: LakeFormationType;
  name: string;
} & AWSDependences;

function resolveImage(type?: LakeFormationType): string {
  switch (type) {
    case 'Data lake':
      return resolveAsset('analytics/LakeFormation/Data-lake.png');
    default:
      return resolveAsset('analytics/LakeFormation.png');
  }
}

function useIcon(type?: LakeFormationType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const LakeFormation: FC<LakeFormationProps> = ({
  type,
  name,
  children,
  upstream,
  downstream,
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

LakeFormation.displayName = 'LakeFormation';
