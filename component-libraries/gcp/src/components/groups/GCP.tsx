import React, { FC, useMemo } from 'react';
import { Provider, EdgeStyleBuilder, BuildEdgeStyle } from '@rediagram/cdk';
import { Subgraph, DOT } from '@ts-graphviz/react';
import { EdgeAttributes } from 'ts-graphviz';
import { resolveAsset } from '../../assets';
import { StyleOption } from '../../types';

const icon = resolveAsset('groups/logo.png');

const colorMap = Object.freeze({
  blue: '#4284F3',
  gray: '#9E9E9E',
  green: '#34A853',
  red: '#EA4335',
  yellow: '#F4B400',
  pink: '#FF69B4',
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

const defaultStyle: EdgeAttributes = { fontsize: 12, color: '#3A7DF0' };

const buildStyle: BuildEdgeStyle<StyleOption> = (option) => {
  let style: EdgeAttributes = {};
  if (option !== undefined) {
    switch (option.theme) {
      case 'Primary':
        style = { color: colorMap.blue, ...style };
        break;
      case 'Optional Primary':
        style = { color: colorMap.blue, style: 'dashed', ...style };
        break;
      case 'Secondary':
        style = { color: colorMap.gray, ...style };
        break;
      case 'Optional Secondary':
        style = { color: colorMap.gray, style: 'dashed', ...style };
        break;
      case 'Success':
        style = { color: colorMap.green, ...style };
        break;
      case 'Failure':
        style = { color: colorMap.red, ...style };
        break;
      default:
        switch (option.color) {
          case 'blue':
            style = { color: colorMap.blue, ...style };
            break;
          case 'gray':
            style = { color: colorMap.gray, ...style };
            break;
          case 'green':
            style = { color: colorMap.green, ...style };
            break;
          case 'red':
            style = { color: colorMap.red, ...style };
            break;
          case 'yellow':
            style = { color: colorMap.yellow, ...style };
            break;
          case 'pink':
            style = { color: colorMap.pink, ...style };
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
export type GCPProps = {
  title?: string;
};
export const GCP: FC<GCPProps> = ({ title, children }) => {
  return (
    <Provider name="gcp">
      <Subgraph
        id={useID('cluster_gcp')}
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
              {title ? <DOT.TD>{title}</DOT.TD> : null}
            </DOT.TR>
          </DOT.TABLE>
        }
      >
        <EdgeStyleBuilder build={buildStyle}>{children}</EdgeStyleBuilder>
      </Subgraph>
    </Provider>
  );
};

export const InvizGCP: FC = ({ children }) => {
  return (
    <Provider name="gcp">
      <Subgraph id={useID('gcp')} fontsize="12">
        <EdgeStyleBuilder build={buildStyle}>{children}</EdgeStyleBuilder>
      </Subgraph>
    </Provider>
  );
};
