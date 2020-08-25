import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type CommandLineInterfaceCategory = 'developer-tools' | 'management-governance';

export type CommandLineInterfaceProps = {
  category?: CommandLineInterfaceCategory;
  name: string;
} & HasDependences;

function resolveImage(category: CommandLineInterfaceCategory): string {
  return resolve(__dirname, '../../../assets/', category, 'CommandLineInterface.png');
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
  upstream,
  downstream,
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

CommandLineInterface.displayName = 'CommandLineInterface';
