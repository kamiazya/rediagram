import { resolve } from 'path';
import React, { FC, useMemo, isValidElement } from 'react';
import { Node, Edge, ClusterPortal, DOT } from '@ts-graphviz/react';
import t from 'prop-types';
import { useAssertProvider } from '../../hooks/assert-provider';

type Props = {
  type?: Type;
  name: string;
  upstream?: string[];
  downstream?: string[];
};

type Type =
  | 'Add-on'
  | 'AWS STS Alternate'
  | 'AWS STS'
  | 'Data Encryption Key'
  | 'Encrypted Data'
  | 'Long term Security Credential'
  | 'MFA Token'
  | 'Permissions'
  | 'Role'
  | 'Temporary Security Credential';

function resolveImage(type?: Type): string {
  switch (type) {
    case 'Add-on':
      return resolve(__dirname, '../../../assets/security/IAM/Add-on.png');
    case 'AWS STS Alternate':
      return resolve(__dirname, '../../../assets/security/IAM/AWS-STS-Alternate.png');
    case 'AWS STS':
      return resolve(__dirname, '../../../assets/security/IAM/AWS-STS.png');
    case 'Data Encryption Key':
      return resolve(__dirname, '../../../assets/security/IAM/Data-Encryption-Key.png');
    case 'Encrypted Data':
      return resolve(__dirname, '../../../assets/security/IAM/Encrypted-Data.png');
    case 'Long term Security Credential':
      return resolve(__dirname, '../../../assets/security/IAM/Long-term-Security-Credential.png');
    case 'MFA Token':
      return resolve(__dirname, '../../../assets/security/IAM/MFA-Token.png');
    case 'Permissions':
      return resolve(__dirname, '../../../assets/security/IAM/Permissions.png');
    case 'Role':
      return resolve(__dirname, '../../../assets/security/IAM/Role.png');
    case 'Temporary Security Credential':
      return resolve(__dirname, '../../../assets/security/IAM/Temporary-Security-Credential.png');
    default:
      return resolve(__dirname, '../../../assets/security/IAM.png');
  }
}

function useIcon(type?: Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const IAM: FC<Props> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  return (
    <>
      <Node
        id={name}
        shape="box"
        fixedsize
        width={1}
        height={1}
        penwidth={0} // disable border
        margin={0}
        label={
          <DOT.TABLE BORDER={0} CELLBORDER={0}>
            <DOT.TR>
              <DOT.TD WIDTH={icon.size} HEIGHT={icon.size} FIXEDSIZE>
                <DOT.IMG SRC={icon.path} />
              </DOT.TD>
            </DOT.TR>
            <DOT.TR>
              <DOT.TD>{isValidElement(children) || typeof children === 'string' ? children : name}</DOT.TD>
            </DOT.TR>
          </DOT.TABLE>
        }
      />
      <ClusterPortal>
        {upstream && upstream.map((destination) => <Edge targets={[name, destination]} key={destination} />)}
        {downstream &&
          downstream.map((destination) => <Edge targets={[name, destination]} constraint={false} key={destination} />)}
      </ClusterPortal>
    </>
  );
};

IAM.displayName = 'IAM';
IAM.defaultProps = {
  type: undefined,
  upstream: [],
  downstream: [],
};

IAM.propTypes = {
  type: t.oneOf<Type>([
    'Add-on',
    'AWS STS Alternate',
    'AWS STS',
    'Data Encryption Key',
    'Encrypted Data',
    'Long term Security Credential',
    'MFA Token',
    'Permissions',
    'Role',
    'Temporary Security Credential',
  ]),
  name: t.string.isRequired,
  upstream: t.arrayOf(t.string.isRequired),
  downstream: t.arrayOf(t.string.isRequired),
};
