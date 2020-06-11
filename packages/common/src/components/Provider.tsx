import React, { FC } from 'react';

import t from 'prop-types';
import { ProviderContext } from '../contexts/ProviderContext';

export type ProviderProps = {
  name: string;
};

const ProviderContextProvider = ProviderContext.Provider;

export const Provider: FC<ProviderProps> = ({ name, children }) => {
  return <ProviderContextProvider value={name}>{children}</ProviderContextProvider>;
};

Provider.displayName = 'Provider';

Provider.propTypes = {
  name: t.string.isRequired,
};
