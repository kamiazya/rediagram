import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { Node, DOT } from '@ts-graphviz/react';
import { HasDependences, Dependences, useLabelText } from 'rediagram';
import { useAssertProvider } from '../../hooks/assert-provider';

export type LambdaProps = {
  type?: LambdaType;
  name: string;
} & HasDependences;

export type LambdaType = 'Lambda Function';

function resolveImage(type?: LambdaType): string {
  switch (type) {
    case 'Lambda Function':
      return resolve(__dirname, '../../../assets/compute/Lambda/Lambda-Function.png');
    default:
      return resolve(__dirname, '../../../assets/compute/Lambda.png');
  }
}

function useIcon(type?: LambdaType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const Lambda: FC<LambdaProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <>
      <Node
        id={name}
        shape="box"
        fixedsize
        width={1}
        height={1}
        penwidth={0} // disable border
        margin={0}
        label={
          <DOT.TABLE BORDER={0} CELLBORDER={0}>
            <DOT.TR>
              <DOT.TD WIDTH={icon.size} HEIGHT={icon.size} FIXEDSIZE>
                <DOT.IMG SRC={icon.path} />
              </DOT.TD>
            </DOT.TR>
            <DOT.TR>
              <DOT.TD>{label}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      />
      <Dependences origin={name} upstream={upstream} downstream={downstream} />
    </>
  );
};

Lambda.displayName = 'Lambda';
