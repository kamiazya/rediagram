import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type ApplicationIntegrationProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolveAsset('application-integration/ApplicationIntegration.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    return SubLabel('Application Integration');
  }
  return undefined;
}
export const ApplicationIntegration: FC<ApplicationIntegrationProps> = ({ name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ApplicationIntegration.displayName = 'ApplicationIntegration';
