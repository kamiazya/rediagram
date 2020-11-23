import React, { FC } from 'react';
import { Group } from '@rediagram/cdk';
import { DOT } from '@ts-graphviz/react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type ElasticBeanstalkContainerProps = {
  title?: string;
};

function resolveImage(): string {
  return resolveAsset('groups/ElasticBeanstalkContainer.png');
}

export const ElasticBeanstalkContainer: FC<ElasticBeanstalkContainerProps> = ({ title, children }) => {
  useAssertProvider();
  const icon = resolveImage();
  return (
    <Group
      name="elastic_beanstalk_container"
      font={{ color: '#D86613', size: 12 }}
      label={{
        content: (
          <DOT.TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
            <DOT.TR>
              <DOT.TD WIDTH="25" HEIGHT="25" FIXEDSIZE>
                <DOT.IMG SRC={icon} />
              </DOT.TD>
              <DOT.TD>{title ?? 'Elastic Beanstalk container'}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        ),
        loc: 't',
        just: 'l',
      }}
      border={{ color: '#D86613' }}
    >
      {children}
    </Group>
  );
};

ElasticBeanstalkContainer.displayName = 'ElasticBeanstalkContainer';
