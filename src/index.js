import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import App from './App';
import { SettingsProvider } from './utils/usePersistantSettings';
// import reportWebVitals from './reportWebVitals';

const onRedirectCallback = (appState) => {
  return (
    <Redirect to={appState && appState.returnTo ? appState.returnTo : window.location.pathname} />
  )
};


ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        clientId={process.env.REACT_APP_AUTH0_ID}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
