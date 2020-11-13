import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type ElasticBeanstalkType = 'Deployment' | 'Application';

export type ElasticBeanstalkProps = {
  type?: ElasticBeanstalkType;
  name: string;
} & AWSDependences;

function resolveImage(type?: ElasticBeanstalkType): string {
  switch (type) {
    case 'Deployment':
      return resolveAsset('compute/ElasticBeanstalk/Deployment.png');
    case 'Application':
      return resolveAsset('compute/ElasticBeanstalk/Application.png');
    default:
      return resolveAsset('compute/ElasticBeanstalk.png');
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
function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Elastic Beanstalk');
      default:
        return SubLabel('Elastic Beanstalk');
    }
  }
  return undefined;
}
export const ElasticBeanstalk: FC<ElasticBeanstalkProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ElasticBeanstalk.displayName = 'ElasticBeanstalk';
