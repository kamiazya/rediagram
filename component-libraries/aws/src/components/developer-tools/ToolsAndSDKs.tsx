import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type ToolsAndSDKsProps = {
  name: string;
} & AWSDependences;

function resolveImage(): string {
  return resolveAsset('developer-tools/ToolsAndSDKs.png');
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
    return SubLabel('Tools & SDKs');
  }
  return undefined;
}

export const ToolsAndSDKs: FC<ToolsAndSDKsProps> = ({ name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ToolsAndSDKs.displayName = 'ToolsAndSDKs';
