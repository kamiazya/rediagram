import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ElasticKubernetesServiceProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolve(__dirname, '../../../assets/compute/ElasticKubernetesService.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const ElasticKubernetesService: FC<ElasticKubernetesServiceProps> = ({
  name,
  children,
  upstream,
  downstream,
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ElasticKubernetesService.displayName = 'ElasticKubernetesService';
