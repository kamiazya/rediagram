import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

type AppSyncCategory = 'mobile' | 'application-integration';
export type AppSyncProps = {
  category?: AppSyncCategory;
  name: string;
} & AWSDependences;

function resolveImage(category: AppSyncCategory): string {
  return resolveAsset(category, 'AppSync.png');
}

function useIcon(category: AppSyncCategory): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category),
      size: 56,
    };
  }, [category]);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS AppSync');
      default:
        return SubLabel('AppSync');
    }
  }
  return undefined;
}

export const AppSync: FC<AppSyncProps> = ({ category = 'mobile', name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

AppSync.displayName = 'AppSync';
