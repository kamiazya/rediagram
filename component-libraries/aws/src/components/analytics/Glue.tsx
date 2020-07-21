import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type GlueProps = {
  type?: GlueType;
  name: string;
} & HasDependences;

export type GlueType = 'Crawler' | 'Data catalog';

function resolveImage(type?: GlueType): string {
  switch (type) {
    case 'Crawler':
      return resolve(__dirname, '../../../assets/analytics/Glue/Crawler.png');
    case 'Data catalog':
      return resolve(__dirname, '../../../assets/analytics/Glue/Data-catalog.png');
    default:
      return resolve(__dirname, '../../../assets/analytics/Glue.png');
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
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Glue.displayName = 'Glue';
