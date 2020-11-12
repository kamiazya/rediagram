import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const CommandLineInterface: FC<CommandLineInterfaceProps> = ({
  name,
  category = 'management-governance',
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

CommandLineInterface.displayName = 'CommandLineInterface';
