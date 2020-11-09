import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type ElasticInferenceProps = {
  name: string;
} & AWSDependences;

function resolveImage(): string {
  return resolveAsset('machine-learning/ElasticInference.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const ElasticInference: FC<ElasticInferenceProps> = ({
  name,
  children,
  upstream,
  downstream,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};

ElasticInference.displayName = 'ElasticInference';
