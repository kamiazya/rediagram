import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type DirectoryServiceProps = {
  type?: DirectoryServiceType;
  name: string;
} & HasDependences;

export type DirectoryServiceType = 'Simple AD' | 'AD Connector' | 'AWS Managed Microsoft AD';

function resolveImage(type?: DirectoryServiceType): string {
  switch (type) {
    case 'Simple AD':
      return resolve(__dirname, '../../../assets/security-identity-compliance/DirectoryService/Simple-AD.png');
    case 'AD Connector':
      return resolve(__dirname, '../../../assets/security-identity-compliance/DirectoryService/AD-Connector.png');
    case 'AWS Managed Microsoft AD':
      return resolve(
        __dirname,
        '../../../assets/security-identity-compliance/DirectoryService/AWS-Managed-Microsoft-AD.png',
      );
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/DirectoryService.png');
  }
}

function useIcon(type?: DirectoryServiceType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const DirectoryService: FC<DirectoryServiceProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

DirectoryService.displayName = 'DirectoryService';
