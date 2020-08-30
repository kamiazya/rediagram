import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';

export type APIAnalyticsProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolve(__dirname, '../../../assets/api/APIAnalytics.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const APIAnalytics: FC<APIAnalyticsProps> = ({ name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <GCPNode
      service="API Analytics"
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
    />
  );
};

APIAnalytics.displayName = 'APIAnalytics';
