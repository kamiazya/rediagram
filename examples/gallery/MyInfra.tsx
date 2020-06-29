import React from 'react';
import { PNG, Diagram } from 'rediagram';
import {
  AWS,
  EC2,
  Lambda,
  Region,
  // AvailabilityZone,
  SecurityGroup,
  AutoScalingGroup,
  AWSGeneralIcon,
} from '@rediagram/aws';

PNG(
  <Diagram title="My Infra">
    <AWS>
      <Region name="Asia Pacific (Tokyo)">
        <AutoScalingGroup>
          <EC2 name="REST API" type="Instance" upstream={['worker4']} />
        </AutoScalingGroup>
        <SecurityGroup>
          <Lambda name="worker4" type="Lambda Function" upstream={['worker5', 'worker6']} />
          <Lambda name="worker5" type="Lambda Function" />
          <Lambda name="worker6" type="Lambda Function" />
        </SecurityGroup>
      </Region>
    </AWS>
    <AWSGeneralIcon name="Browser" type="Client" upstream={['REST API']} />
  </Diagram>,
);
