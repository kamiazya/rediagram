import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

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
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/action.png');
    case 'actuator':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/actuator.png');
    case 'Alexa enabled device':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/alexa-enabled-device.png');
    case 'Alexa skill':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/alexa-skill.png');
    case 'Alexa voice service':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/alexa-voice-service.png');
    case 'Certificate manager':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/certificate-manager.png');
    case 'desired state':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/desired-state.png');
    case 'Device gateway':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/device-gateway.png');
    case 'Echo':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/echo.png');
    case 'Fire TV':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/fire-TV.png');
    case 'Fire TV stick':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/fire-TV-stick.png');
    case 'hardware board':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/hardware-board.png');
    case 'HTTP/2 protocol':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/HTTP-2-protocol.png');
    case 'HTTP protocol':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/HTTP-protocol.png');
    case 'Lambda function':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/lambda-function.png');
    case 'MQTT protocol':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/MQTT-protocol.png');
    case 'Over-the-air update':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/over-the-air-update.png');
    case 'policy':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/policy.png');
    case 'reported-state':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/reported-state.png');
    case 'rule':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/rule.png');
    case 'sensor':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/sensor.png');
    case 'servo':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/servo.png');
    case 'shadow':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/shadow.png');
    case 'simulator':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/simulator.png');
    case 'topic':
    default:
      return resolve(__dirname, '../../../assets/internet-of-things/IoTResource/topic.png');
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
} & HasDependences;

export const IoTResource: FC<IoTResourceProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

IoTResource.displayName = 'IoTResource';
