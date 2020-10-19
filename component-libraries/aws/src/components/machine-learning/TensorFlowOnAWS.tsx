import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type TensorFlowOnAWSProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolveAsset('machine-learning/TensorFlowOnAWS.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const TensorFlowOnAWS: FC<TensorFlowOnAWSProps> = ({ name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

TensorFlowOnAWS.displayName = 'TensorFlowOnAWS';
