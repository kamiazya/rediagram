import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type QuantumLedgerDatabaseCategory = 'blockchain' | 'database';

export type QuantumLedgerDatabaseProps = {
  category?: QuantumLedgerDatabaseCategory;
  name: string;
} & AWSDependences;

function resolveImage(category: QuantumLedgerDatabaseCategory): string {
  return resolveAsset('', category, '/QuantumLedgerDatabase.png');
}

function useIcon(category: QuantumLedgerDatabaseCategory): { path: string; size: number } {
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
        return SubLabel('Amazon Quantum Ledger Database');
      case 'medium':
        return SubLabel('Quantum Ledger Database');
      default:
        return SubLabel('QLDB');
    }
  }
  return undefined;
}

export const QuantumLedgerDatabase: FC<QuantumLedgerDatabaseProps> = ({
  category = 'database',
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

QuantumLedgerDatabase.displayName = 'QuantumLedgerDatabase';

export const QLDB = QuantumLedgerDatabase;
