import React, { FC, ReactElement } from 'react';
import { Node, DOT } from '@ts-graphviz/react';
import { HasDependences, Dependences } from './Dependence';

export type IconNodeProps = {
  icon: { size: number; path: string };
  label?: string | ReactElement | undefined;
  name: string;
} & HasDependences;

export const IconNode: FC<IconNodeProps> = ({ name, icon, label, upstream, downstream }) => {
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

IconNode.displayName = 'IconNode';
