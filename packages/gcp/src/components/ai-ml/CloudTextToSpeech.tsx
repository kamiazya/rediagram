import React, { FC, useMemo } from 'react';
import { useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';
import { GCPDependences } from '../../types';

export type CloudTextToSpeechProps = {
  name: string;
} & GCPDependences;

function resolveImage(): string {
  return resolveAsset('ai-ml/CloudTextToSpeech.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const CloudTextToSpeech: FC<CloudTextToSpeechProps> = ({ name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <GCPNode service="Cloud Text-to-Speech" name={name} icon={icon} label={label} {...dependences} />;
};

CloudTextToSpeech.displayName = 'CloudTextToSpeech';
