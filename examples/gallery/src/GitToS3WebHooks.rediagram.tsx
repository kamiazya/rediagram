import React from 'react';
import { PNG, Diagram, TextBox, GeneralIcon } from 'rediagram';
import { AWS, InvizAWS, Lambda, S3, IAM } from '@rediagram/aws';

PNG(
  <Diagram title="Git to S3 Webhooks">
    <InvizAWS>
      <AWS>
        <Lambda name="Lambda 1" upstream={['Lambda 2']}>
          AWS Lambda
        </Lambda>
        <Lambda name="Lambda 2" upstream={['SSH key', 'keys', 'output']}>
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
      <GeneralIcon name="Git Users" type="Users" upstream={[{ destination: 'Repository', description: 'Git Push' }]} />
      <TextBox
        name="Repository"
        upstream={[{ destination: 'Lambda 1', description: 'Git webhook' }]}
        downstream={['Lambda 2']}
      >
        Third-party\n Git repository
      </TextBox>
    </InvizAWS>
  </Diagram>,
);
