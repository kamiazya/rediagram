import React from 'react';
import { DOT } from '@ts-graphviz/react';
import { renderHook } from '@testing-library/react-hooks';

import { useLabelText } from '../label';

describe('label', () => {
  describe('useLabelText', () => {
    it('should return as it is when input ReactElement', () => {
      const { result } = renderHook(() => useLabelText(<DOT.I>test</DOT.I>));
      expect(result.current).toMatchSnapshot();
    });
  });
});
