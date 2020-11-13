import React, { FC, useMemo } from 'react';
import { Provider, EdgeStyleBuilder, BuildEdgeStyle } from '@rediagram/cdk';
import { Subgraph, DOT } from '@ts-graphviz/react';
import { EdgeAttributes } from 'ts-graphviz';
import { resolveAsset } from '../../assets';
import { AWSContext, StyleOption } from '../../types';
import { Context } from '../../contexts/Context';
import { useAWSContext } from '../../hooks/context';

const icon = resolveAsset('groups/aws.png');

const colorMap = Object.freeze({
  purple: '#5521B8',
  lipstickA: '#BF0152',
  lipstickB: '#BE0152',
  dell: '#33761B',
  tiaMaria: '#CD5111',
  monza: '#CA0C22',
  governorBay: '#2D2FC1',
  greenPea: '#1A6955',
});

// eslint-disable-next-line func-names
const randomColor = (function* (): Generator<string, void, unknown> {
  function shuffle([...arr]: string[]): string[] {
    let m = arr.length;
    while (m) {
      // eslint-disable-next-line no-plusplus
      const i = Math.floor(Math.random() * m--);
      // eslint-disable-next-line no-param-reassign
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }
  while (true) {
    // eslint-disable-next-line no-restricted-syntax
    for (const color of shuffle(Object.values(colorMap))) {
      yield color;
    }
  }
})();

const defaultStyle: EdgeAttributes = Object.freeze({ fontsize: 12, color: '#535B63', fontcolor: '#232F3D' });

const buildStyle: BuildEdgeStyle<StyleOption> = (option) => {
  let style: EdgeAttributes = {};
  if (option !== undefined) {
    switch (option.color) {
      case 'purple':
        style = { color: colorMap.purple, ...style };
        break;
      case 'lipstickA':
        style = { color: colorMap.lipstickA, ...style };
        break;
      case 'lipstickB':
        style = { color: colorMap.lipstickB, ...style };
        break;
      case 'dell':
        style = { color: colorMap.dell, ...style };
        break;
      case 'tiaMaria':
        style = { color: colorMap.tiaMaria, ...style };
        break;
      case 'monza':
        style = { color: colorMap.monza, ...style };
        break;
      case 'governorBay':
        style = { color: colorMap.governorBay, ...style };
        break;
      case 'greenPea':
        style = { color: colorMap.greenPea, ...style };
        break;
      case 'auto':
        // eslint-disable-next-line no-case-declarations
        const { value: color } = randomColor.next();
        if (color) {
          style = { color, ...style };
        }
        break;
      default:
        break;
    }
    switch (option.style) {
      case 'dashed':
        style = { style: 'dashed', ...style };
        break;
      default:
        break;
    }
  }
  return { ...defaultStyle, ...style };
};

let id = 0;

function useID(name: string): string {
  return useMemo(() => {
    id += 1;
    return `${name}_${id}`;
  }, [name]);
}

export type AWSProps = {
  title?: string;
} & AWSContext;

export const AWS: FC<AWSProps> = ({ title, children, ...context }) => {
  const prevContext = useAWSContext();
  return (
    <Provider name="aws">
      <Context.Provider value={{ ...prevContext, ...context }}>
        <Subgraph
          id={useID('cluster_aws')}
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
                <DOT.TD>{title ?? 'AWS Cloud'}</DOT.TD>
              </DOT.TR>
            </DOT.TABLE>
          }
        >
          <EdgeStyleBuilder build={buildStyle}>{children}</EdgeStyleBuilder>
        </Subgraph>
      </Context.Provider>
    </Provider>
  );
};

export const InvizAWS: FC<AWSContext> = ({ children, ...context }) => {
  const prevContext = useAWSContext();
  return (
    <Provider name="aws">
      <Context.Provider value={{ ...prevContext, ...context }}>
        <Subgraph id={useID('aws')} fontsize="12" color="#232F3D">
          <EdgeStyleBuilder build={buildStyle}>{children}</EdgeStyleBuilder>
        </Subgraph>
      </Context.Provider>
    </Provider>
  );
};
