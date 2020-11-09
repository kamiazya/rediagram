import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type SageMakerType = 'Ground Truth' | 'Notebook' | 'Model' | 'Train';

function resolveImage(type?: SageMakerType): string {
  switch (type) {
    case 'Ground Truth':
      return resolveAsset('internet-of-things/SageMaker/Ground-Truth.png');
    case 'Notebook':
      return resolveAsset('internet-of-things/SageMaker/Notebook.png');
    case 'Model':
      return resolveAsset('internet-of-things/SageMaker/Model.png');
    case 'Train':
      return resolveAsset('internet-of-things/SageMaker/Train.png');
    default:
      return resolveAsset('internet-of-things/SageMaker.png');
  }
}

function useIcon(type?: SageMakerType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined || type === 'Ground Truth' ? 56 : 37,
    };
  }, [type]);
}

export type SageMakerProps = {
  type?: SageMakerType;
  name: string;
} & AWSDependences;

export const SageMaker: FC<SageMakerProps> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
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

SageMaker.displayName = 'SageMaker';
