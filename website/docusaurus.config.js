/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: 'rediagram',
  tagline: 'Markup and draw your system diagrams with React.',
  url: 'https://kamiazya.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: '/',
  organizationName: 'kamiazya', // Usually your GitHub org/user name.
  projectName: 'rediagram', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
      ja: {
        label: '日本語',
        direction: 'ltr',
      },
    },
  },
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
          type: 'localeDropdown',
          position: 'right',
        },
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

module.exports = config;
