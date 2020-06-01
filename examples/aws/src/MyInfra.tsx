import React, { FC } from 'react';
import { Diagram } from '@diagrams-prototype/common';
import { AWS, EC2, Lambda, Region, AvailabilityZone, SecurityGroup, AutoScalingGroup } from '@diagrams-prototype/aws';

export const MyInfra: FC = () => {
  return (
    <Diagram rankdir="LR">
      <AWS>
        <Region name="Asia Pacific (Tokyo)">
          <AutoScalingGroup>
            <AvailabilityZone>
              <EC2 name="worker1" type="Instance" upstream={['worker4']} />
              <EC2 name="worker2" type="Instance" upstream={['worker4', 'worker5']} />
            </AvailabilityZone>
            <SecurityGroup>
              <Lambda name="worker4" type="Lambda Function" />
              <Lambda name="worker5" type="Lambda Function" upstream={['worker6']} />
              <Lambda name="worker6" type="Lambda Function" />
            </SecurityGroup>
          </AutoScalingGroup>
        </Region>
      </AWS>
      <EC2 name="shell" upstream={['worker1', 'worker2']} />
    </Diagram>
  );
};
