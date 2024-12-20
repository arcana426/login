import { logError } from './error-handler.js';
import { handleCredentialResponse } from './auth-callbacks.js';

const GOOGLE_CLIENT_ID = '900815271183-2s26pm30nftccia7ld0odsjq8o7g67vr.apps.googleusercontent.com';
const RETRY_INTERVAL = 100;
const MAX_RETRIES = 50;

// Ensure callback is available globally before Google client loads
window.handleCredentialResponse = handleCredentialResponse;

export function initializeGoogleAuth() {
  let retryCount = 0;

  function initializeGoogleSignIn() {
    if (typeof window.handleCredentialResponse !== 'function') {
      logError(new Error('Callback function not found'), 'Google認証の初期化に失敗しました。');
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: window.handleCredentialResponse
      });

      renderSignInButton();
    } catch (error) {
      logError(error, 'Failed to initialize Google Sign-In');
    }
  }

  function renderSignInButton() {
    const signInButton = document.querySelector('.g_id_signin');
    if (signInButton) {
      google.accounts.id.renderButton(signInButton, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        width: 250,
        logo_alignment: 'center',
        text: 'signin_with'
      });
    }
  }

  function checkGoogleAPI() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      initializeGoogleSignIn();
    } else if (retryCount < MAX_RETRIES) {
      retryCount++;
      setTimeout(checkGoogleAPI, RETRY_INTERVAL);
    } else {
      logError(new Error('Google API failed to load'), 'Google認証の初期化に失敗しました。');
    }
  }

  // Start checking for Google API
  checkGoogleAPI();
}