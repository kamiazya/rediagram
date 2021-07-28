import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export const SecurityGroup: FC = ({ children }) => {
  useAssertProvider();
  return (
    <Group
      name="security_group"
      font={{ color: '#DF3312', size: 12 }}
      label={{ content: 'Security Group', loc: 't', just: 'c' }}
      border={{ color: '#DF3312', style: 'dashed' }}
    >
      {children}
    </Group>
  );
};

SecurityGroup.displayName = 'SecurityGroup';
