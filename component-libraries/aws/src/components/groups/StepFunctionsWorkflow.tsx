import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type StepFunctionsWorkflowProps = {
  title?: string;
};

function resolveImage(): string {
  return resolveAsset('groups/StepFunctionsWorkflow.png');
}

export const StepFunctionsWorkflow: FC<StepFunctionsWorkflowProps> = ({ title, children }) => {
  useAssertProvider();
  const icon = resolveImage();
  return (
    <Group
      name="step_functions_workflow"
      font={{ color: '#CD2264', size: 12 }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>{title ?? 'AWS Step Functions workflow'}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'l',
      }}
      border={{ color: '#CD2264' }}
    >
      {children}
    </Group>
  );
};

StepFunctionsWorkflow.displayName = 'StepFunctionsWorkflow';
