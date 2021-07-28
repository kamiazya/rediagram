import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../hooks/assert-provider';
import { Props, Type } from '../types';
import { resolveAsset } from '../assets';
import { useFirebaseContext } from '../hooks/context';
import { SubLabel } from '../hooks/service-name';

function resolveImage(type: Type): string {
  return resolveAsset('GoogleAnalytics', `${type}.png`);
}

function useIcon(type: Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: 37,
    };
  }, [type]);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useFirebaseContext();
  if (serviceName) {
    return SubLabel('Google Analytics');
  }
  return undefined;
}

export const GoogleAnalytics: FC<Props> = ({ name, type, children, ...dependences }) => {
  useAssertProvider();
  const { defaultType } = useFirebaseContext();
  const icon = useIcon(type ?? defaultType);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} subLabel={subLabel} label={label} {...dependences} />;
};

GoogleAnalytics.displayName = 'GoogleAnalytics';
