import React, { FC, useMemo } from 'react';
import { useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';
import { GCPDependences } from '../../types';

export type AIPlatformDataLabelingServiceProps = {
  name: string;
} & GCPDependences;

function resolveImage(): string {
  return resolveAsset('ai-ml/AIPlatformDataLabelingService.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const AIPlatformDataLabelingService: FC<AIPlatformDataLabelingServiceProps> = ({
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <GCPNode service="AI Platform Data Labeling Service" name={name} icon={icon} label={label} {...dependences} />;
};

AIPlatformDataLabelingService.displayName = 'AIPlatformDataLabelingService';
