import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';


ReactDOM.render(
  <Auth0Provider
  domain="dev-3db0lbeo.us.auth0.com"
  clientId="ye6W7Ix7QC8D0lKBIIhFDR28Yl2QUOEk"
  redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);