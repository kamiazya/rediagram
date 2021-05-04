import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../hooks/assert-provider';
import { Props, Type } from '../types';
import { resolveAsset } from '../assets';
import { useFirebaseContext } from '../hooks/context';
import { SubLabel } from '../hooks/service-name';

function resolveImage(type: Type): string {
  return resolveAsset('RealtimeDatabase', `${type}.png`);
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
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Firebase Realtime Database');
      default:
        return SubLabel('Realtime Database');
    }
  }
  return undefined;
}

export const RealtimeDatabase: FC<Props> = ({ name, type, children, ...dependences }) => {
  useAssertProvider();
  const { defaultType } = useFirebaseContext();
  const icon = useIcon(type ?? defaultType);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} subLabel={subLabel} label={label} {...dependences} />;
};

RealtimeDatabase.displayName = 'RealtimeDatabase';
