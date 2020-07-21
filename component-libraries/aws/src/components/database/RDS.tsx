import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type RDSType =
  | 'Aurora'
  | 'Aurora alt'
  | 'MariaDB'
  | 'MariaDB alt'
  | 'MySQL'
  | 'MySQL alt'
  | 'on VMware'
  | 'Oracle'
  | 'Oracle alt'
  | 'PIOPS'
  | 'PostgreSQL'
  | 'PostgreSQL alt'
  | 'RDS'
  | 'RDS alt'
  | 'SQL Server'
  | 'SQL Server alt';

function resolveImage(type?: RDSType): string {
  switch (type) {
    case 'Aurora':
      return resolve(__dirname, '../../../assets/database/RDS/Aurora.png');
    case 'Aurora alt':
      return resolve(__dirname, '../../../assets/database/RDS/Aurora-alt.png');
    case 'MariaDB':
      return resolve(__dirname, '../../../assets/database/RDS/MariaDB.png');
    case 'MariaDB alt':
      return resolve(__dirname, '../../../assets/database/RDS/MariaDB-alt.png');
    case 'MySQL':
      return resolve(__dirname, '../../../assets/database/RDS/MySQL.png');
    case 'MySQL alt':
      return resolve(__dirname, '../../../assets/database/RDS/MySQL-alt.png');
    case 'on VMware':
      return resolve(__dirname, '../../../assets/database/RDS/on-VMware.png');
    case 'Oracle':
      return resolve(__dirname, '../../../assets/database/RDS/Oracle.png');
    case 'Oracle alt':
      return resolve(__dirname, '../../../assets/database/RDS/Oracle-alt.png');
    case 'PIOPS':
      return resolve(__dirname, '../../../assets/database/RDS/PIOPS.png');
    case 'PostgreSQL':
      return resolve(__dirname, '../../../assets/database/RDS/PostgreSQL.png');
    case 'PostgreSQL alt':
      return resolve(__dirname, '../../../assets/database/RDS/PostgreSQL-alt.png');
    case 'RDS':
      return resolve(__dirname, '../../../assets/database/RDS/RDS.png');
    case 'RDS alt':
      return resolve(__dirname, '../../../assets/database/RDS/RDS-alt.png');
    case 'SQL Server':
      return resolve(__dirname, '../../../assets/database/RDS/SQL-Server.png');
    case 'SQL Server alt':
      return resolve(__dirname, '../../../assets/database/RDS/SQL-Server-alt.png');
    default:
      return resolve(__dirname, '../../../assets/database/RDS.png');
  }
}

function useIcon(type?: RDSType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined || type === 'on VMware' ? 56 : 37,
    };
  }, [type]);
}

export type RDSProps = {
  type?: RDSType;
  name: string;
} & HasDependences;

export const RDS: FC<RDSProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

RDS.displayName = 'RDS';
