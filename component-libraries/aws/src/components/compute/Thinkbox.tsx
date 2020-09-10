import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

type ThinkboxType = 'Deadline' | 'Frost' | 'Krakatoa' | 'Sequoia' | 'Stoke' | 'Mesh';

export type ThinkboxProps = {
  name: string;
  type: ThinkboxType;
} & HasDependences;

function resolveImage(type: ThinkboxType): string {
  switch (type) {
    case 'Mesh':
      return resolve(__dirname, '../../../assets/compute/Thinkbox/Mesh.png');
    case 'Stoke':
      return resolve(__dirname, '../../../assets/compute/Thinkbox/Stoke.png');
    case 'Sequoia':
      return resolve(__dirname, '../../../assets/compute/Thinkbox/Sequoia.png');
    case 'Krakatoa':
      return resolve(__dirname, '../../../assets/compute/Thinkbox/Krakatoa.png');
    case 'Frost':
      return resolve(__dirname, '../../../assets/compute/Thinkbox/Frost.png');
    case 'Deadline':
    default:
      return resolve(__dirname, '../../../assets/compute/Thinkbox/Deadline.png');
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

export const Thinkbox: FC<ThinkboxProps> = ({ name, type, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Thinkbox.displayName = 'Thinkbox';
