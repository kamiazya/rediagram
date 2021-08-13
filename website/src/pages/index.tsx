/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
import React, { FC } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';

import styles from './styles.module.css';

type FeatureProps = {
  imageUrl: string;
  title: string;
  description: JSX.Element;
}

const features: FeatureProps[] = [
  {
    title: translate({
      id: 'top.visualizeYourInfrastructure.title',
      message: 'Visualize your Infrastructure',
      description: 'Title for top page feature \'Visualize your Infrastructure\'',
    }),
    imageUrl: 'img/undraw_mind_map.svg',
    description: (
      <Translate
        id="top.visualizeYourInfrastructure.description"
        description="Description for top page feature 'Visualize your Infrastructure'">
        rediagram is a platform for visualizing cloud infrastructure such as AWS and GCP.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'top.poweredByReact.title',
      message: 'Powered by React',
      description: 'Title for feature \'Powered by React\' on top page',
    }),
    imageUrl: 'img/undraw_react.svg',
    description: (
      <Translate
        id="top.poweredByReact.description"
        description="Description for feature 'Powered by React' on top page">
        Extend or customize your diagram layout by reusing React.
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'top.batteryIncludes.title',
      message: 'Battery includes',
      description: 'Title for feature \'Battery includes\' on top page',
    }),
    imageUrl: 'img/undraw_abstract.svg',
    description: (
      <Translate
        id="top.batteryIncludes.description"
        description="Description for feature 'Battery includes' on top page">
        rediagram already provides AWS and GCP services as components and provides a library, it is not necessary to make the components that are often needed.
      </Translate>
    ),
  },
];

const Feature: FC<FeatureProps> = ({ imageUrl, title, description }) => {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const Home: FC = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const tagline = translate({
    id: 'top.tagline',
    message: 'Markup and draw your system diagrams with React.',
    description: 'Tagline message on top page',
  });
  return (
    <Layout title="Top" description="Markup and draw your system diagrams with React.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--outline button--secondary button--lg', styles.getStarted)}
              to={useBaseUrl('docs/')}
            >
              <Translate id="top.getStarted" description="Text for 'Get Started' button on top page">Get Started</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props) => (
                  <Feature key={props.title} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
