/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-filename-extension */
import React, { FC } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type FeatureProps = {
  imageUrl: string;
  title: string;
  description: JSX.Element;
}

const features: FeatureProps[] = [
  {
    title: 'Visualize your Infrastructure',
    imageUrl: 'img/undraw_mind_map.svg',
    description: (
      <>
        rediagram is a platform for visualizing cloud infrastructure such as AWS and GCP.
      </>
    ),
  },
  {
    title: 'Powered by React',
    imageUrl: 'img/undraw_react.svg',
    description: (
      <>
        Extend or customize your diagram layout by reusing React.
      </>
    ),
  },
  {
    title: 'Battery includes',
    imageUrl: 'img/undraw_abstract.svg',
    description: (
      <>
        rediagram already provides AWS and GCP services as components and provides a library, it is not necessary to make the components that are often needed.
      </>
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
  return (
    <Layout title="Top" description="Markup and draw your system diagrams with React.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--outline button--secondary button--lg', styles.getStarted)}
              to={useBaseUrl('docs/')}
            >
              Get Started
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
