import React, { FC, useMemo } from 'react';
import { DOT } from '@ts-graphviz/react';

export type TitleProps = {
  title?: string;
  width?: number;
};

export const TitleBar: FC<TitleProps> = ({ title, width, children }) => {
  const w = useMemo(() => width ?? 1000, [width]);
  const padding = useMemo(() => w > 50, [w]);
  return (
    <DOT.TABLE BORDER="0" CELLSPACING="0" CELLBORDER="1">
      <DOT.TR>
        <DOT.TD COLOR="#519BF7" BGCOLOR="#519BF7" WIDTH={50} HEIGHT={30} FIXEDSIZE />
        <DOT.TD COLOR="#519BF7" BGCOLOR="#519BF7" WIDTH={padding ? w - 50 : w} HEIGHT={30} FIXEDSIZE ALIGN="LEFT">
          <DOT.FONT COLOR="#FFFFFF">{title ?? children}</DOT.FONT>
        </DOT.TD>
      </DOT.TR>
      <DOT.TR>
        <DOT.TD BORDER="0" HEIGHT={20} />
        <DOT.TD BORDER="0" HEIGHT={20} />
        <DOT.TD BORDER="0" HEIGHT={20} />
      </DOT.TR>
    </DOT.TABLE>
  );
};
