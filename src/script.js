import { GoogleAuthService } from './utils/auth/google-auth.service.js';
import { NotificationService } from './utils/ui/notifications.js';
import { ModalService } from './utils/ui/modal.service.js';
import { setupCSP } from './utils/csp.js';
import { redirectToHome } from './utils/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  setupCSP();
  initializeUI();
  initializeAuth();
  cleanupURLParameters();
});

function initializeUI() {
  NotificationService.hideAllNotifications();
  ModalService.setupHandlers();
}

function initializeAuth() {
  GoogleAuthService.initialize((userData) => {
    NotificationService.showSuccess(`ようこそ、${userData.name}さん！`);
    setTimeout(() => redirectToHome(), 1000);
  }, {
    auto_select: false // ポップアップを自動的に表示させない設定を追加
  });
}

function cleanupURLParameters() {
  const url = new URL(window.location.href);
  const iValue = url.searchParams.get('i');
  if (iValue && ['1', '2', '3'].includes(iValue)) {
    url.searchParams.delete('i');
    window.history.replaceState(null, '', url.toString());
  }
}

// Explicitly define the callback function in the global scope
window.handleCredentialResponse = (response) => {
  GoogleAuthService.handleCredentialResponse(response);
};
