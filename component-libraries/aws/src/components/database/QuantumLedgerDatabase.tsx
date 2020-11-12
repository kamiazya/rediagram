import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const QuantumLedgerDatabase: FC<QuantumLedgerDatabaseProps> = ({
  category = 'database',
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

QuantumLedgerDatabase.displayName = 'QuantumLedgerDatabase';
