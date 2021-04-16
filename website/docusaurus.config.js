module.exports = {
  title: 'rediagram',
  tagline: 'Markup and draw your system diagrams with React.',
  url: 'https://rediagram.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: '/',
  organizationName: 'kamiazya', // Usually your GitHub org/user name.
  projectName: 'rediagram', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'rediagram',
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/kamiazya/rediagram',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kamiazya/rediagram',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} kamiazya.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/kamiazya/rediagram/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/kamiazya/rediagram/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
