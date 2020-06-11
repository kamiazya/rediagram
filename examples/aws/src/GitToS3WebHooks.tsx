import React, { FC } from 'react';
import { DOT } from '@ts-graphviz/react';
import { Diagram, Text } from '@diagrams-prototype/common';
import { AWS, Lambda, AWSGeneralIcon, S3, IAM } from '@diagrams-prototype/aws';

export const GitToS3WebHooks: FC = () => {
  return (
    <Diagram title="Git to S3 Webhooks">
      <AWS>
        <Lambda name="Lambda 1" upstream={['Lambda 2']} />
        <Lambda name="Lambda 2" upstream={['SSH key', 'keys', 'output']} downstream={['Repository']} />
        <S3 name="SSH key" type="Bucket with Objects">
          <>
            Amazon S3
            <DOT.BR />
            SSH key bucket
          </>
        </S3>
        <S3 name="output" type="Bucket with Objects">
          <>
            Amazon S3
            <DOT.BR />
            output bucket
          </>
        </S3>
        <IAM name="keys" type="Add-on">
          AWS KMS key
        </IAM>
      </AWS>
      <AWSGeneralIcon name="Git Users" type="Users" upstream={['Repository']} />
      <Text name="Repository" upstream={['Lambda 1']}>
        <>
          Third-party
          <DOT.BR />
          Git repository
        </>
      </Text>
    </Diagram>
  );
};
