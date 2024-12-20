// Updated Auth Service with improved validation
import { GoogleAuthService } from './google-auth.service.js';
import { UserService } from './user.service.js';
import { AuthValidator } from '../validators/auth.validator.js';
import { NotificationService } from '../ui/notifications.js';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';

export class AuthService {
  static async signOut() {
    try {
      GoogleAuthService.signOut();
      UserService.clearUserData();
      return true;
    } catch (error) {
      NotificationService.showError(ERROR_MESSAGES.AUTH.LOGOUT_FAILED);
      throw error;
    }
  }

  static async registerUser(username, email, password) {
    await this.validateRegistration(username, email, password);
    return true;
  }

  static async validateRegistration(username, email, password) {
    AuthValidator.validateUsername(username);
    AuthValidator.validateEmail(email);
    AuthValidator.validatePassword(password);
  }
}