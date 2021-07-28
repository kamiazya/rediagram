import React, { FC, useMemo } from 'react';
import { useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';
import { GCPDependences } from '../../types';

export type CloudDataprocProps = {
  name: string;
  description?: string;
} & GCPDependences;

function resolveImage(): string {
  return resolveAsset('data-analytics/CloudDataproc.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const CloudDataproc: FC<CloudDataprocProps> = ({ name, description, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <GCPNode
      service="Cloud Dataproc"
      name={name}
      description={description}
      icon={icon}
      label={label}
      {...dependences}
    />
  );
};

CloudDataproc.displayName = 'CloudDataproc';
