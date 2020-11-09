import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const Thinkbox: FC<ThinkboxProps> = ({ name, type, children, upstream, downstream, dependencesOption }) => {
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

Thinkbox.displayName = 'Thinkbox';
