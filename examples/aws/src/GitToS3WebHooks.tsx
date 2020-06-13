import React, { FC } from 'react';
import { Diagram, Text } from '@diagrams-prototype/common';
import { AWS, Lambda, AWSGeneralIcon, S3, IAM } from '@diagrams-prototype/aws';

export const GitToS3WebHooks: FC = () => {
  return (
    <Diagram title="Git to S3 Webhooks">
      <AWS>
        <Lambda name="Lambda 1" upstream={['Lambda 2']}>
          AWS Lambda
        </Lambda>
        <Lambda name="Lambda 2" upstream={['SSH key', 'keys', 'output']} downstream={['Repository']}>
          AWS Lambda
        </Lambda>
        <S3 name="SSH key" type="Bucket with Objects">
          Amazon S3\nSSH key bucket
        </S3>
        <S3 name="output" type="Bucket with Objects">
          Amazon S3\noutput bucket
        </S3>
        <IAM name="keys" type="Add-on">
          AWS KMS key
        </IAM>
      </AWS>
      <AWSGeneralIcon
        name="Git Users"
        type="Users"
        upstream={[{ destination: 'Repository', description: 'Git Push' }]}
      />
      <Text name="Repository" upstream={[{ destination: 'Lambda 1', description: 'Git webhook' }]}>
        Third-party\n Git repository
      </Text>
    </Diagram>
  );
};
