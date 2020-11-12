import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type ServerlessApplicationRepositoryProps = {
  name: string;
} & AWSDependences;

function resolveImage(): string {
  return resolveAsset('compute/ServerlessApplicationRepository.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const ServerlessApplicationRepository: FC<ServerlessApplicationRepositoryProps> = ({
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

ServerlessApplicationRepository.displayName = 'ServerlessApplicationRepository';
