import React, { FC } from 'react';
import { Diagram } from '@diagrams-prototype/common';
import { AWS, EC2, VPC } from '@diagrams-prototype/aws';

export const ChefAutomateArchitectureOnAWS: FC = () => {
  return (
    <Diagram title="Chef Automate Architecture on AWS">
      <AWS>
        <VPC>
          <VPC type="Public subnet">
            <EC2 type="Instance" name="instance1" upstream={['instance2']}>
              Chef workstation \n (local Chef repo)
            </EC2>
            <EC2 type="Instance" name="instance2" upstream={['instance3']}>
              Chef node
            </EC2>
            <EC2 type="Instance" name="instance3" upstream={['instance1']}>
              Chef Automate
            </EC2>
          </VPC>
        </VPC>
      </AWS>
    </Diagram>
  );
};
