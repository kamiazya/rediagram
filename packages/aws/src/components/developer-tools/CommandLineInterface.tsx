import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type CommandLineInterfaceCategory = 'developer-tools' | 'management-governance';

export type CommandLineInterfaceProps = {
  category?: CommandLineInterfaceCategory;
  name: string;
} & AWSDependences;

function resolveImage(category: CommandLineInterfaceCategory): string {
  return resolveAsset('', category, 'CommandLineInterface.png');
}

function useIcon(category: CommandLineInterfaceCategory): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category),
      size: 56,
    };
  }, [category]);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Command Line Interface');
      case 'medium':
        return SubLabel('Command Line Interface');
      default:
        return SubLabel('CLI');
    }
  }
  return undefined;
}

export const CommandLineInterface: FC<CommandLineInterfaceProps> = ({
  name,
  category = 'management-governance',
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

CommandLineInterface.displayName = 'CommandLineInterface';

export const CLI = CommandLineInterface;
