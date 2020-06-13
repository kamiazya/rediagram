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
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
      />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js" />
      {/* and it's easy to individually load additional languages */}
      <script
        charSet="UTF-8"
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/languages/javascript.min.js"
      />
      <script>hljs.initHighlightingOnLoad();</script>
    </head>
    <body>
      <article
        className="markdown-body"
        style={{
          boxSizing: 'border-box',
          minWidth: '200px',
          maxWidth: '980px',
          margin: '0 auto',
          padding: '45px',
        }}
      >
        {children}
      </article>
    </body>
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
