import React, { FC, useMemo } from 'react';
import { Subgraph } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';

let availabilityZoneID = 0;

export type ZoneProps = {
  name: string;
};

export const Zone: FC<ZoneProps> = ({ name, children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    availabilityZoneID += 1;
    return availabilityZoneID;
  }, []);
  return (
    <Subgraph
      id={`cluster_zone_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="l"
      color="#E3F2FD"
      margin={10}
      fontcolor="#9E9E9E"
      fillcolor="#E3F2FD"
      style="filled"
      label={name}
    >
      {children}
    </Subgraph>
  );
};

Zone.displayName = 'Zone';
