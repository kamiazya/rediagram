import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon SageMaker');
      default:
        return SubLabel('SageMaker');
    }
  }
  return undefined;
}

export const SageMaker: FC<SageMakerProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

SageMaker.displayName = 'SageMaker';
