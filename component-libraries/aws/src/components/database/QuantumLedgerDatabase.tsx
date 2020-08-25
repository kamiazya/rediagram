import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type QuantumLedgerDatabaseCategory = 'blockchain' | 'database';

export type QuantumLedgerDatabaseProps = {
  category?: QuantumLedgerDatabaseCategory;
  name: string;
} & HasDependences;

function resolveImage(category: QuantumLedgerDatabaseCategory): string {
  return resolve(__dirname, '../../../assets/', category, '/QuantumLedgerDatabase.png');
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
  upstream,
  downstream,
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

QuantumLedgerDatabase.displayName = 'QuantumLedgerDatabase';
