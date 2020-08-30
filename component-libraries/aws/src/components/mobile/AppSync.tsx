import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

type AppSyncCategory = 'mobile' | 'application-integration';
export type AppSyncProps = {
  category?: AppSyncCategory;
  name: string;
} & HasDependences;

function resolveImage(category: AppSyncCategory): string {
  return resolve(__dirname, '../../../assets', category, 'AppSync.png');
}

function useIcon(category: AppSyncCategory): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category),
      size: 56,
    };
  }, [category]);
}

export const AppSync: FC<AppSyncProps> = ({ category = 'mobile', name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

AppSync.displayName = 'AppSync';
