import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type GlueType = 'Crawler' | 'Data catalog';

export type GlueProps = {
  type?: GlueType;
  name: string;
} & HasDependences;

function resolveImage(type?: GlueType): string {
  switch (type) {
    case 'Crawler':
      return resolveAsset('analytics/Glue/Crawler.png');
    case 'Data catalog':
      return resolveAsset('analytics/Glue/Data-catalog.png');
    default:
      return resolveAsset('analytics/Glue.png');
  }
}

function useIcon(type?: GlueType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const Glue: FC<GlueProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Glue.displayName = 'Glue';
