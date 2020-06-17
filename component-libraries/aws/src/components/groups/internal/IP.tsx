import React, { FC } from 'react';
import { Subgraph } from '@ts-graphviz/react';

export type HasIP = {
  ip?: string;
};

type IPProps = {
  id: string | number;
} & HasIP;

export const IP: FC<IPProps> = ({ ip, children }) => {
  if (ip === undefined) {
    return <>{children}</>;
  }
  return (
    <Subgraph id={`cluster_vpc_ip_${ip}`} rank="min" label={ip} color="none" bgcolor="none" labelloc="b" labeljust="c">
      {children}
    </Subgraph>
  );
};
