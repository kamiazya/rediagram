import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type LakeFormationProps = {
  type?: LakeFormationType;
  name: string;
} & HasDependences;

export type LakeFormationType = 'Data lake';

function resolveImage(type?: LakeFormationType): string {
  switch (type) {
    case 'Data lake':
      return resolve(__dirname, '../../../assets/analytics/LakeFormation/Data-lake.png');
    default:
      return resolve(__dirname, '../../../assets/analytics/LakeFormation.png');
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

export const LakeFormation: FC<LakeFormationProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

LakeFormation.displayName = 'LakeFormation';
