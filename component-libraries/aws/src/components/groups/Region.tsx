import React, { FC, useMemo } from 'react';
import { Subgraph, DOT } from '@ts-graphviz/react';
import t from 'prop-types';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

type Props = {
  name: string;
};

const icon = resolveAsset('groups/region.png');

let regionID = 0;

export const Region: FC<Props> = ({ name, children }) => {
  useAssertProvider();
  const id = useMemo(() => {
    regionID += 1;
    return regionID;
  }, []);
  return (
    <Subgraph
      id={`cluster_region_${id}`}
      fontsize="12"
      labelloc="t"
      labeljust="l"
      color="#007CBC"
      fontcolor="#007CBC"
      style="dashed"
      label={
        <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <DOT.TR>
            <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
              <DOT.IMG SRC={icon} />
            </DOT.TD>
            <DOT.TD>{name}</DOT.TD>
          </DOT.TR>
        </DOT.TABLE>
      }
    >
      {children}
    </Subgraph>
  );
};

Region.displayName = 'Region';

Region.propTypes = {
  name: t.string.isRequired,
};
