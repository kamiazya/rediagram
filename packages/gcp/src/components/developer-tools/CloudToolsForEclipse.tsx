import React, { FC, useMemo } from 'react';
import { useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';
import { GCPDependences } from '../../types';

export type CloudToolsForEclipseProps = {
  name: string;
  description?: string;
} & GCPDependences;

function resolveImage(): string {
  return resolveAsset('developer-tools/CloudToolsForEclipse.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const CloudToolsForEclipse: FC<CloudToolsForEclipseProps> = ({
  name,
  description,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <GCPNode
      service="Cloud Tools for Eclipse"
      name={name}
      description={description}
      icon={icon}
      label={label}
      {...dependences}
    />
  );
};

CloudToolsForEclipse.displayName = 'CloudToolsForEclipse';
