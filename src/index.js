import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
ReactDOM.render(
  <Auth0Provider
    domain="sara-alshater.us.auth0.com"
    clientId="UIE3EqXvd9KyM9QA4Qk5KkXHz866Mm19"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);