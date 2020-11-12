import React, { FC, ReactElement } from 'react';
import { Node, DOT } from '@ts-graphviz/react';
import { Dependences } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPDependences } from '../../types';

export type GCPNodeProps = {
  icon: { size: number; path: string };
  label?: string | ReactElement;
  name: string;
  service: string;
  description?: string;
} & GCPDependences;

export const GCPNode: FC<GCPNodeProps> = ({ name, service, description, icon, label, ...dependences }) => {
  useAssertProvider();
  return (
    <>
      <Node
        id={name}
        shape="box"
        // penwidth={0} // disable border
        penwidth={1}
        color="#bdbdbd"
        style="filled"
        fillcolor="#ffffff"
        fontsize={12}
        margin={0}
        label={
          <DOT.TABLE BORDER={0} CELLBORDER={0} BGCOLOR="#FFFFFFF">
            <DOT.TR>
              <DOT.TD WIDTH={icon.size} HEIGHT={icon.size} FIXEDSIZE>
                <DOT.IMG SRC={icon.path} />
              </DOT.TD>
              <DOT.TD>
                <DOT.TABLE BORDER={0} CELLBORDER={0}>
                  <DOT.TR>
                    <DOT.TD ALIGN="LEFT">
                      <DOT.FONT COLOR="#212121">{label}</DOT.FONT>
                    </DOT.TD>
                  </DOT.TR>
                  <DOT.TR>
                    <DOT.TD ALIGN="LEFT">
                      <DOT.FONT COLOR="#757575">{service}</DOT.FONT>
                    </DOT.TD>
                  </DOT.TR>
                  {description ? (
                    <>
                      <DOT.HR />
                      <DOT.TR>
                        <DOT.TD ALIGN="LEFT">
                          <DOT.FONT COLOR="#757575">{description}</DOT.FONT>
                        </DOT.TD>
                      </DOT.TR>
                    </>
                  ) : null}
                </DOT.TABLE>
              </DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      />
      <Dependences origin={name} {...dependences} />
    </>
  );
};

GCPNode.displayName = 'GCPNode';
