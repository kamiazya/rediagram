import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type IoTResourceType =
  | 'action'
  | 'actuator'
  | 'Alexa enabled device'
  | 'Alexa skill'
  | 'Alexa voice service'
  | 'Certificate manager'
  | 'desired state'
  | 'Device gateway'
  | 'Echo'
  | 'Fire TV'
  | 'Fire TV stick'
  | 'hardware board'
  | 'HTTP/2 protocol'
  | 'HTTP protocol'
  | 'Lambda function'
  | 'MQTT protocol'
  | 'Over-the-air update'
  | 'policy'
  | 'reported-state'
  | 'rule'
  | 'sensor'
  | 'servo'
  | 'shadow'
  | 'simulator'
  | 'topic';

function resolveImage(type: IoTResourceType): string {
  switch (type) {
    case 'action':
      return resolveAsset('internet-of-things/IoTResource/action.png');
    case 'actuator':
      return resolveAsset('internet-of-things/IoTResource/actuator.png');
    case 'Alexa enabled device':
      return resolveAsset('internet-of-things/IoTResource/alexa-enabled-device.png');
    case 'Alexa skill':
      return resolveAsset('internet-of-things/IoTResource/alexa-skill.png');
    case 'Alexa voice service':
      return resolveAsset('internet-of-things/IoTResource/alexa-voice-service.png');
    case 'Certificate manager':
      return resolveAsset('internet-of-things/IoTResource/certificate-manager.png');
    case 'desired state':
      return resolveAsset('internet-of-things/IoTResource/desired-state.png');
    case 'Device gateway':
      return resolveAsset('internet-of-things/IoTResource/device-gateway.png');
    case 'Echo':
      return resolveAsset('internet-of-things/IoTResource/echo.png');
    case 'Fire TV':
      return resolveAsset('internet-of-things/IoTResource/fire-TV.png');
    case 'Fire TV stick':
      return resolveAsset('internet-of-things/IoTResource/fire-TV-stick.png');
    case 'hardware board':
      return resolveAsset('internet-of-things/IoTResource/hardware-board.png');
    case 'HTTP/2 protocol':
      return resolveAsset('internet-of-things/IoTResource/HTTP-2-protocol.png');
    case 'HTTP protocol':
      return resolveAsset('internet-of-things/IoTResource/HTTP-protocol.png');
    case 'Lambda function':
      return resolveAsset('internet-of-things/IoTResource/lambda-function.png');
    case 'MQTT protocol':
      return resolveAsset('internet-of-things/IoTResource/MQTT-protocol.png');
    case 'Over-the-air update':
      return resolveAsset('internet-of-things/IoTResource/over-the-air-update.png');
    case 'policy':
      return resolveAsset('internet-of-things/IoTResource/policy.png');
    case 'reported-state':
      return resolveAsset('internet-of-things/IoTResource/reported-state.png');
    case 'rule':
      return resolveAsset('internet-of-things/IoTResource/rule.png');
    case 'sensor':
      return resolveAsset('internet-of-things/IoTResource/sensor.png');
    case 'servo':
      return resolveAsset('internet-of-things/IoTResource/servo.png');
    case 'shadow':
      return resolveAsset('internet-of-things/IoTResource/shadow.png');
    case 'simulator':
      return resolveAsset('internet-of-things/IoTResource/simulator.png');
    case 'topic':
    default:
      return resolveAsset('internet-of-things/IoTResource/topic.png');
  }
}

function useIcon(type: IoTResourceType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type IoTResourceProps = {
  type: IoTResourceType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS IoT Resource');
      default:
        return SubLabel('IoT Resource');
    }
  }
  return undefined;
}

export const IoTResource: FC<IoTResourceProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

IoTResource.displayName = 'IoTResource';
