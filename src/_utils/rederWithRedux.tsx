import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from '../store';

const renderWithRedux = (ui: ReactElement) => {
  return {
    ...render(<Provider store={store} > {ui} </ Provider>),
    store
  }
}


export default renderWithRedux;