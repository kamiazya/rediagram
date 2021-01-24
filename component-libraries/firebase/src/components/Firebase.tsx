import React, { FC } from 'react';
import { Group, Provider, EdgeStyleBuilder, BuildEdgeStyle } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';

import { EdgeAttributes } from 'ts-graphviz';
import { resolveAsset } from '../assets';
import { FirebaseContext, StyleOption } from '../types';
import { Context } from '../contexts/Context';
import { useFirebaseContext } from '../hooks/context';

const icon = resolveAsset('Firebase/standard.png');

const colorMap = Object.freeze({
  blue: '#039BE5',
  navy: '#2C384A',
  coral: '#FF8A65',
  gray: '#ECEFF1',
});

const defaultStyle: EdgeAttributes = Object.freeze({ fontsize: 12, color: colorMap.blue, fontcolor: colorMap.navy });

const buildStyle: BuildEdgeStyle<StyleOption> = (option) => {
  let style: EdgeAttributes = {};
  if (option !== undefined) {
    if (option.color) {
      style = { color: colorMap[option.color], ...style };
    }
    if (option.style) {
      style = { style: option.style, ...style };
    }
  }
  return { ...defaultStyle, ...style };
};

export type FirebaseProps = {
  fill?: 'gray';
} & Partial<FirebaseContext>;

export const Firebase: FC<FirebaseProps> = ({ fill, children, ...context }) => {
  const prevContext = useFirebaseContext();
  return (
    <Provider name="firebase">
      <Context.Provider value={{ ...prevContext, ...context }}>
        <Group
          name="firebase"
          font={{ size: 12, color: colorMap.navy }}
          label={{
            content: (
              <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
                <DOT.TR>
                  <DOT.TD WIDTH="88.8" HEIGHT="25" FIXEDSIZE>
                    <DOT.IMG SRC={icon} />
                  </DOT.TD>
                </DOT.TR>
              </DOT.TABLE>
            ),
            loc: 't',
            just: 'l',
          }}
          background={{
            color: fill !== undefined ? colorMap[fill] : undefined,
          }}
          border={{
            style: 'none',
          }}
          margin={15}
        >
          <EdgeStyleBuilder build={buildStyle}>{children}</EdgeStyleBuilder>
        </Group>
      </Context.Provider>
    </Provider>
  );
};

export const InvizFirebase: FC<Partial<FirebaseContext>> = ({ children, ...context }) => {
  const prevContext = useFirebaseContext();
  return (
    <Provider name="firebase">
      <Context.Provider value={{ ...prevContext, ...context }}>
        <EdgeStyleBuilder build={buildStyle}>{children}</EdgeStyleBuilder>
      </Context.Provider>
    </Provider>
  );
};
