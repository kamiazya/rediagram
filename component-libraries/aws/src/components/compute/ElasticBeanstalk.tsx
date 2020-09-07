import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ElasticBeanstalkType = 'Deployment' | 'Application';

export type ElasticBeanstalkProps = {
  type?: ElasticBeanstalkType;
  name: string;
} & HasDependences;

function resolveImage(type?: ElasticBeanstalkType): string {
  switch (type) {
    case 'Deployment':
      return resolve(__dirname, '../../../assets/compute/ElasticBeanstalk/Deployment.png');
    case 'Application':
      return resolve(__dirname, '../../../assets/compute/ElasticBeanstalk/Application.png');
    default:
      return resolve(__dirname, '../../../assets/compute/ElasticBeanstalk.png');
  }
}

function useIcon(type?: ElasticBeanstalkType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const ElasticBeanstalk: FC<ElasticBeanstalkProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ElasticBeanstalk.displayName = 'ElasticBeanstalk';
