import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';

export type ApigeeSenseProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolveAsset('api/ApigeeSense.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const ApigeeSense: FC<ApigeeSenseProps> = ({ name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <GCPNode service="Apigee Sense" name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />
  );
};

ApigeeSense.displayName = 'ApigeeSense';
