import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type RoboMakerType = 'Cloud extensions ROS' | 'Development environment' | 'Fleet management' | 'Simulation';

function resolveImage(type?: RoboMakerType): string {
  switch (type) {
    case 'Cloud extensions ROS':
      return resolveAsset('robotics/RoboMaker/Cloud-extensions-ROS.png');
    case 'Development environment':
      return resolveAsset('robotics/RoboMaker/Development-environment.png');
    case 'Fleet management':
      return resolveAsset('robotics/RoboMaker/Fleet-management.png');
    case 'Simulation':
      return resolveAsset('robotics/RoboMaker/Simulation.png');
    default:
      return resolveAsset('robotics/RoboMaker.png');
  }
}

function useIcon(type?: RoboMakerType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type RoboMakerProps = {
  type?: RoboMakerType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS RoboMaker');
      default:
        return SubLabel('RoboMaker');
    }
  }
  return undefined;
}

export const RoboMaker: FC<RoboMakerProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
