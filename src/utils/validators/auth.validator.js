// Authentication validation utilities
import { AUTH_CONSTANTS } from '../constants/auth.constants.js';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';

export class AuthValidator {
  static validateUsername(username) {
    if (username.length < AUTH_CONSTANTS.MIN_USERNAME_LENGTH) {
      throw new Error(ERROR_MESSAGES.VALIDATION.USERNAME_LENGTH);
    }
    return true;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(ERROR_MESSAGES.VALIDATION.INVALID_EMAIL);
    }
    return true;
  }

  static validatePassword(password) {
    if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
      throw new Error(ERROR_MESSAGES.VALIDATION.PASSWORD_LENGTH);
    }
    return true;
  }
}