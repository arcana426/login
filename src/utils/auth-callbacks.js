import { saveUserData } from './user-storage.js';
import { showError, showSuccess } from './notifications.js';
import { decodeJwtPayload } from './jwt.js';
import { redirectToHome } from './navigation.js';

export function handleCredentialResponse(response) {
  if (!response?.credential) {
    showError('ログインに失敗しました。再試行してください。');
    return;
  }

  try {
    const payload = decodeJwtPayload(response.credential);
    saveUserData(payload);
    showSuccess(`ようこそ、${payload.name}さん！`);

    // Redirect to home page after successful login
    setTimeout(() => {
      redirectToHome();
    }, 1000);
  } catch (error) {
    console.error('Error processing credential:', error);
    showError('ログインに失敗しました。再試行してください。');
  }
}