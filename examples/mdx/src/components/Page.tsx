import React, { FC } from 'react';
import t from 'prop-types';

type Props = {
  title?: string;
  lang?: string;
};

export const Page: FC<Props> = ({ title, lang, children }) => (
  <html lang={lang}>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </head>
    <body>{children}</body>
  </html>
);

Page.defaultProps = {
  lang: 'en',
  title: undefined,
};

Page.propTypes = {
  lang: t.string,
  title: t.string,
};
