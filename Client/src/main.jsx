import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import {PublicClientApplication} from '@azure/msal-browser'
// import {MsalProvider} from '@azure/msal-react'
// import { msalConfig } from './auth/msalConfig.js'

// const msalInstance = new PublicClientApplication(msalConfig);
const clientId = '466235392574-qdun00sk76kh88aoadavfaa00btub40e.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider> */}
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
