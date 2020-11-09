import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

type DatabaseMigrationServiceCategory = 'database' | 'migration-transfer';

export type DatabaseMigrationServiceType = 'workflow/job';

function resolveImage(category: DatabaseMigrationServiceCategory, type?: DatabaseMigrationServiceType): string {
  switch (type) {
    case 'workflow/job':
      return resolveAsset(category, 'DatabaseMigrationService/workflow-job.png');
    default:
      return resolveAsset(category, 'DatabaseMigrationService.png');
  }
}

function useIcon(
  category: DatabaseMigrationServiceCategory,
  type?: DatabaseMigrationServiceType,
): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category, type),
      size: type === undefined ? 56 : 37,
    };
  }, [category, type]);
}

export type DatabaseMigrationServiceProps = {
  category?: DatabaseMigrationServiceCategory;
  type?: DatabaseMigrationServiceType;
  name: string;
} & AWSDependences;

export const DatabaseMigrationService: FC<DatabaseMigrationServiceProps> = ({
  category = 'database',
  type,
  name,
  upstream,
  downstream,
  children,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon(category, type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};

DatabaseMigrationService.displayName = 'DatabaseMigrationService';
