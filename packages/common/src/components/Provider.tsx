import React, { FC } from 'react';

import t from 'prop-types';
import { ProviderContext } from '../contexts/ProviderContext';

type Props = {
  name: string;
};

export const Provider: FC<Props> = ({ name, children }) => {
  return <ProviderContext.Provider value={name}>{children}</ProviderContext.Provider>;
};

Provider.displayName = 'Provider';

Provider.propTypes = {
  name: t.string.isRequired,
};
