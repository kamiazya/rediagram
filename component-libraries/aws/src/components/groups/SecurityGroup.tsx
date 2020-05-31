import React, { FC, useMemo } from 'react';
import { Subgraph } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';

let securityGroupID = 0;

export const SecurityGroup: FC = ({ children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    securityGroupID += 1;
    return securityGroupID;
  }, []);
  return (
    <Subgraph
      id={`cluster_security_group_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="c"
      color="#DF3312"
      fontcolor="#DF3312"
      label="Security Group"
    >
      {children}
    </Subgraph>
  );
};

SecurityGroup.displayName = 'SecurityGroup';
