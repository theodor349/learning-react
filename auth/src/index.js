import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth: {
    clientId: 'f9b237d2-be27-4aea-a794-64ea3105cf7a',
    authority: 'https://login.microsoftonline.com/2812789b-224d-4c33-b7b8-a4940d6e56ce',
    redirectUri: '/'
  },
  cache:{
    cacheLocation: 'localStorage', // LocalStorage enables sso for multiple apps - SessionStorage is only for one app
    storeAuthStateInCookie: false
  },
  system:{
    loggerOptions:{
      loggerCallback: (level, message, containsPii) => {
        console.log(message);
      },
      logLevel: "Info",
    }
  }
})

pca.addEventCallback((event) => {
  console.log(event);
  if(event.eventType === EventType.LOGIN_SUCCESS){
    pca.setActiveAccount(event.payload.account);
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // Reason for uncommenting this: https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5468#:~:text=Don%27t%20use%20StrictMode%20until%20the%20React%20team%20addresses%20this%20gap
    <App msalInstance={pca} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
