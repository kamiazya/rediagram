import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import t from 'prop-types';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

type Props = {
  name: string;
};

const icon = resolveAsset('groups/region.png');

export const Region: FC<Props> = ({ name, children }) => {
  useAssertProvider();
  return (
    <Group
      name="region"
      font={{ color: '#007CBC', size: 12 }}
      border={{ color: '#007CBC', style: 'dashed' }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>{name}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'l',
      }}
    >
      {children}
    </Group>
  );
};

Region.displayName = 'Region';

Region.propTypes = {
  name: t.string.isRequired,
};
