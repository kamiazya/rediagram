import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type PinpointCategory = 'customer-engagement' | 'mobile';

export type PinpointProps = {
  category?: PinpointCategory;
  name: string;
} & AWSDependences;

function resolveImage(category: PinpointCategory): string {
  return resolveAsset('', category, 'Pinpoint.png');
}

function useIcon(category: PinpointCategory): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category),
      size: 56,
    };
  }, [category]);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Pinpoint');
      default:
        return SubLabel('Pinpoint');
    }
  }
  return undefined;
}

export const Pinpoint: FC<PinpointProps> = ({ category = 'mobile', name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Pinpoint.displayName = 'Pinpoint';
