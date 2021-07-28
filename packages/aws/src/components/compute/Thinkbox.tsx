import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

type ThinkboxType = 'Deadline' | 'Frost' | 'Krakatoa' | 'Sequoia' | 'Stoke' | 'Mesh';

export type ThinkboxProps = {
  name: string;
  type: ThinkboxType;
} & AWSDependences;

function resolveImage(type: ThinkboxType): string {
  switch (type) {
    case 'Mesh':
      return resolveAsset('compute/Thinkbox/Mesh.png');
    case 'Stoke':
      return resolveAsset('compute/Thinkbox/Stoke.png');
    case 'Sequoia':
      return resolveAsset('compute/Thinkbox/Sequoia.png');
    case 'Krakatoa':
      return resolveAsset('compute/Thinkbox/Krakatoa.png');
    case 'Frost':
      return resolveAsset('compute/Thinkbox/Frost.png');
    case 'Deadline':
    default:
      return resolveAsset('compute/Thinkbox/Deadline.png');
  }
}

function useIcon(type: ThinkboxType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: 56,
    };
  }, [type]);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Thinkbox');
      default:
        return SubLabel('Thinkbox');
    }
  }
  return undefined;
}

export const Thinkbox: FC<ThinkboxProps> = ({ name, type, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Thinkbox.displayName = 'Thinkbox';
