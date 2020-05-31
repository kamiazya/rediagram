import React, { FC, useMemo } from 'react';
import { Subgraph } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';

let availabilityZoneID = 0;

export const AvailabilityZone: FC = ({ children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    availabilityZoneID += 1;
    return availabilityZoneID;
  }, []);
  return (
    <Subgraph
      id={`cluster_availability_zone_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="c"
      color="#007CBC"
      fontcolor="#007CBC"
      style="dashed"
      label="Availability Zone"
    >
      {children}
    </Subgraph>
  );
};

AvailabilityZone.displayName = 'AvailabilityZone';
