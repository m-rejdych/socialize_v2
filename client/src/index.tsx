import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import theme from './theme';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
