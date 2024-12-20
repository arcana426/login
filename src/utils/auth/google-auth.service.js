import { NotificationService } from '../ui/notifications.js';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';
import { AUTH_CONSTANTS } from '../constants/auth.constants.js';
import { UserService } from './user.service.js';
import { JwtService } from './jwt.service.js';

export class GoogleAuthService {
  static retryCount = 0;
  static onSuccessCallback = null;

  static initialize(onSuccess) {
    if (typeof onSuccess !== 'function') {
      console.error('Invalid callback provided to GoogleAuthService.initialize');
      return;
    }

    this.onSuccessCallback = onSuccess;
    this.checkGoogleAPI();
  }

  static handleCredentialResponse(response) {
    if (!response?.credential) {
      NotificationService.showError(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
      return;
    }

    try {
      const payload = JwtService.decodeToken(response.credential);
      UserService.saveUserData(payload);
      if (this.onSuccessCallback) {
        this.onSuccessCallback(payload);
      }
    } catch (error) {
      console.error('Error processing credential:', error);
      NotificationService.showError(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
    }
  }

  static initializeGoogleSignIn() {
    try {
      google.accounts.id.initialize({
        client_id: AUTH_CONSTANTS.GOOGLE_CLIENT_ID,
        callback: window.handleCredentialResponse,
        auto_select: false
      });
      this.renderSignInButton();
    } catch (error) {
      console.error('Failed to initialize Google Sign-In:', error);
      NotificationService.showError(ERROR_MESSAGES.AUTH.GOOGLE_INIT_FAILED);
    }
  }

  static checkGoogleAPI() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      this.initializeGoogleSignIn();
    } else if (this.retryCount < AUTH_CONSTANTS.MAX_RETRIES) {
      this.retryCount++;
      setTimeout(() => this.checkGoogleAPI(), AUTH_CONSTANTS.RETRY_INTERVAL);
    } else {
      NotificationService.showError(ERROR_MESSAGES.AUTH.GOOGLE_INIT_FAILED);
    }
  }

  static renderSignInButton() {
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

  static signOut() {
    if (google?.accounts?.id) {
      google.accounts.id.disableAutoSelect();
    }
  }
}