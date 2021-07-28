import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';

export type HasIP = {
  ip?: string;
};

type IPProps = HasIP;

export const IP: FC<IPProps> = ({ ip, children }) => {
  if (ip === undefined) {
    return <>{children}</>;
  }
  return (
    <Group
      name="vpc_ip"
      label={{ content: ip, loc: 'b', just: 'c' }}
      border={{ color: 'none' }}
      background={{ color: 'none' }}
    >
      {children}
    </Group>
  );
};
