import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const AppSync: FC<AppSyncProps> = ({ category = 'mobile', name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

AppSync.displayName = 'AppSync';
