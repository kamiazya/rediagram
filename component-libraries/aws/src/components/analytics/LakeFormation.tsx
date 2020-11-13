import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Lake Formation');
      default:
        return SubLabel('Lake Formation');
    }
  }
  return undefined;
}

export const LakeFormation: FC<LakeFormationProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

LakeFormation.displayName = 'LakeFormation';
