import React from 'react';
import { PNG, Diagram } from 'rediagram';
import { AWS, EC2, VPC } from '@rediagram/aws';

PNG(
  <Diagram title="Chef Automate Architecture on AWS">
    <AWS>
      <VPC ip="10.0.0.0/16">
        <VPC type="Public subnet" ip="10.0.0.0/19">
          <EC2 type="Instance" name="instance1" upstream={['instance2']}>
            Chef workstation \n (local Chef repo)
          </EC2>
          <EC2 type="Instance" name="instance2" upstream={[{ destination: 'instance3', position: 'backward' }]}>
            Chef node
          </EC2>
          <EC2 type="Instance" name="instance3" upstream={[{ destination: 'instance1', position: 'backward' }]}>
            Chef Automate
          </EC2>
        </VPC>
      </VPC>
    </AWS>
  </Diagram>,
);
