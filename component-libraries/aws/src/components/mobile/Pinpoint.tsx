import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type PinpointCategory = 'customer-engagement' | 'mobile';

export type PinpointProps = {
  category?: PinpointCategory;
  name: string;
} & HasDependences;

function resolveImage(category: PinpointCategory): string {
  return resolve(__dirname, '../../../assets/', category, 'Pinpoint.png');
}

function useIcon(category: PinpointCategory): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category),
      size: 56,
    };
  }, [category]);
}

export const Pinpoint: FC<PinpointProps> = ({ category = 'mobile', name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Pinpoint.displayName = 'Pinpoint';
