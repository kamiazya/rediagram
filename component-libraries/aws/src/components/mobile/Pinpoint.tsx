import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type PinpointCategory = 'customer-engagement' | 'mobile';

export type PinpointProps = {
  category?: PinpointCategory;
  name: string;
} & HasDependences;

function resolveImage(category: PinpointCategory): string {
  return resolveAsset('', category, 'Pinpoint.png');
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
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Pinpoint.displayName = 'Pinpoint';
