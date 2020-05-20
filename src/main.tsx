import { resolve } from 'path';
import React, { FC } from 'react';
import { renderToDot } from '@ts-graphviz/react';
import { renderDot } from './utils/dot-adapter';
import { Diagram } from './components/Diagram';
import { EC2 } from './components/EC2';
import { Group } from './components/Group';
import { Lambda } from './components/Lambda';

const MyInfra: FC = () => {
  return (
    <Diagram>
      <Group name="AWS">
        <Group name="Secured1">
          <EC2 name="worker1" upstream={['worker4', 'worker5', 'worker6']} />
          <EC2 name="worker2" upstream={['worker4', 'worker5']} />
        </Group>
        <Lambda name="worker4" />
        <Lambda name="worker5" />
        <Lambda name="worker6" />
      </Group>
      <EC2 name="shell" upstream={['worker1', 'worker2']} />
    </Diagram>
  );
};

function main(output: string): void {
  const dot = renderToDot(<MyInfra />);
  renderDot(dot, output);
}

main(resolve(__dirname, '../result.png'));
