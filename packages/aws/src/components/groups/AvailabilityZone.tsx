import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export const AvailabilityZone: FC = ({ children }) => {
  useAssertProvider();
  return (
    <Group
      name="availability_zone"
      font={{ color: '#007CBC', size: 12 }}
      label={{ loc: 't', just: 'c', content: 'Availability Zone' }}
      border={{ color: '#007CBC', style: 'dashed' }}
    >
      {children}
    </Group>
  );
};

AvailabilityZone.displayName = 'AvailabilityZone';
