import React, { FC, ReactElement } from 'react';
import { Node, DOT } from '@ts-graphviz/react';
import { HasDependences, Dependences } from './Dependence';

export type IconNodeProps = {
  icon: { size: number; path: string };
  label?: string | ReactElement | undefined;
  subLabel?: string | ReactElement | undefined;
  name: string;
} & HasDependences;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const IconNode: FC<IconNodeProps> = ({ name, subLabel, icon, label, children, ...dependences }) => {
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
            {subLabel ? (
              <DOT.TR>
                <DOT.TD>{subLabel}</DOT.TD>
              </DOT.TR>
            ) : null}
          </DOT.TABLE>
        }
      />
      <Dependences origin={name} {...dependences} />
    </>
  );
};

IconNode.displayName = 'IconNode';
