import React, { FC, useMemo } from 'react';
import { useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';
import { GCPDependences } from '../../types';

export type CloudDatalabProps = {
  name: string;
  description?: string;
} & GCPDependences;

function resolveImage(): string {
  return resolveAsset('data-analytics/CloudDatalab.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const CloudDatalab: FC<CloudDatalabProps> = ({ name, description, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <GCPNode service="Cloud Datalab" name={name} description={description} icon={icon} label={label} {...dependences} />
  );
};

CloudDatalab.displayName = 'CloudDatalab';
