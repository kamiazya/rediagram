import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Database Migration Service');
      case 'medium':
        return SubLabel('Database Migration Service');
      default:
        return SubLabel('Aurora');
    }
  }
  return undefined;
}

export const DatabaseMigrationService: FC<DatabaseMigrationServiceProps> = ({
  category = 'database',
  type,
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category, type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

DatabaseMigrationService.displayName = 'DatabaseMigrationService';
