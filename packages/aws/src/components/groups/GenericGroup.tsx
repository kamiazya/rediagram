import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type GenericGroupProps = {
  type?: 'filled' | 'dashed';
  title: string;
};

function useStyle(type?: 'filled' | 'dashed') {
  switch (type) {
    case 'filled':
      return {
        fontColor: '#232F3D',
        borderStyle: undefined,
        borderColor: 'none',
        bgColor: '#5A6B860a',
      };
    default:
      return {
        fontColor: '#5A6B86',
        borderColor: '#5A6B86',
        borderStyle: type,
        bgColor: 'none',
      };
  }
}

export const GenericGroup: FC<GenericGroupProps> = ({ title, type, children }) => {
  useAssertProvider();
  const { fontColor, borderStyle, borderColor, bgColor } = useStyle(type);
  return (
    <Group
      name="generic_group"
      font={{ color: fontColor, size: 12 }}
      background={{ color: bgColor }}
      label={{
        content: title,
        loc: 't',
        just: 'c',
      }}
      border={{ style: borderStyle, color: borderColor }}
    >
      {children}
    </Group>
  );
};

GenericGroup.displayName = 'GenericGroup';
