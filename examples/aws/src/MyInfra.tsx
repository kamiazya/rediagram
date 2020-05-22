import React, { FC } from 'react';
import { Diagram, Group } from '@diagrams-prototype/common';
import { EC2, Lambda } from '../../../component-libraries/aws/lib';

export const MyInfra: FC = () => {
  return (
    <Diagram>
      <Group name="AWS">
        <Group name="Secured1">
          <EC2 name="worker1" upstream={['worker4', 'worker5', 'worker6']} />
          <EC2 name="worker2" upstream={['worker4', 'worker5']} />
        </Group>
        <Lambda name="worker4" />
        <Lambda name="worker5" />
        <Lambda name="worker6" />
      </Group>
      <EC2 name="shell" upstream={['worker1', 'worker2']} />
    </Diagram>
  );
};
