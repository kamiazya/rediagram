import React, { FC } from 'react';
import { Provider, DependenciesEdgeAttributes } from '@rediagram/cdk';
import { Subgraph, DOT } from '@ts-graphviz/react';
import { resolveAsset } from '../../assets';

const icon = resolveAsset('groups/logo.png');

export const GCP: FC = ({ children }) => {
  return (
    <Provider name="gcp">
      <Subgraph
        id="cluster_gcp"
        fontsize="12"
        labelloc="t"
        labeljust="l"
        bgcolor="#F6F6F6"
        color="none"
        margin="15"
        label={
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="182" HEIGHT="50" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      >
        <DependenciesEdgeAttributes fontsize={12} color="#3A7DF0">
          {children}
        </DependenciesEdgeAttributes>
      </Subgraph>
    </Provider>
  );
};

export const InvizGCP: FC = ({ children }) => {
  return (
    <Provider name="gcp">
      <Subgraph id="gcp" fontsize="12">
        <DependenciesEdgeAttributes fontsize={12} color="#3A7DF0">
          {children}
        </DependenciesEdgeAttributes>
      </Subgraph>
    </Provider>
  );
};
