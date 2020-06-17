import React, { FC } from 'react';
import { Provider } from 'rediagram';
import { Subgraph, DOT } from '@ts-graphviz/react';
import { resolve } from 'path';

const icon = resolve(__dirname, '../../../assets/groups/aws.png');

export const AWS: FC = ({ children }) => {
  return (
    <Provider name="aws">
      <Subgraph
        id="cluster_aws"
        fontsize="12"
        labelloc="t"
        labeljust="l"
        color="#232F3D"
        margin="15"
        label={
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>AWS Cloud</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      >
        {children}
      </Subgraph>
    </Provider>
  );
};
