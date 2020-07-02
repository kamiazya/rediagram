import React, { ReactElement, isValidElement, ReactNode, useMemo, Fragment } from 'react';
import { DOT } from '@ts-graphviz/react';

function transformToHtmlLike(value: string): string | ReactElement {
  if (value.includes('\\n')) {
    return (
      <>
        {value.split('\\n').map((v) => (
          <Fragment key={v}>
            {v}
            <DOT.BR />
          </Fragment>
        ))}
      </>
    );
  }
  return value;
}

export function useLabelText(
  label?: string | ReactNode,
  { defaultValue, htmlLike = false }: { defaultValue?: string; htmlLike?: boolean } = {},
): string | ReactElement | undefined {
  return useMemo(() => {
    if (isValidElement(label)) {
      return label;
    }
    if (typeof label === 'string') {
      return htmlLike ? transformToHtmlLike(label) : label;
    }
    return htmlLike && defaultValue ? transformToHtmlLike(defaultValue) : defaultValue;
  }, [label, htmlLike, defaultValue]);
}
