// User Service
import { StorageHelper } from '../helpers/storage.helper.js';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';

export class UserService {
  static #storageKeys = {
    NAME: 'userName',
    EMAIL: 'userEmail',
    IMAGE: 'userImage'
  };

  static saveUserData(payload) {
    if (!this.#isValidUserData(payload)) {
      throw new Error(ERROR_MESSAGES.VALIDATION.INVALID_USER_DATA);
    }

    const success = 
      StorageHelper.set(this.#storageKeys.NAME, payload.name) &&
      StorageHelper.set(this.#storageKeys.EMAIL, payload.email) &&
      StorageHelper.set(this.#storageKeys.IMAGE, payload.picture);

    if (!success) {
      throw new Error(ERROR_MESSAGES.SYSTEM.STORAGE_ERROR);
    }
  }

  static loadUserProfile() {
    const name = StorageHelper.get(this.#storageKeys.NAME);
    const email = StorageHelper.get(this.#storageKeys.EMAIL);
    const picture = StorageHelper.get(this.#storageKeys.IMAGE);

    if (!name || !email || !picture) {
      return null;
    }

    return { name, email, picture };
  }

  static clearUserData() {
    Object.values(this.#storageKeys).forEach(key => {
      StorageHelper.remove(key);
    });
  }

  static #isValidUserData(payload) {
    return payload?.name && payload?.email && payload?.picture;
  }
}