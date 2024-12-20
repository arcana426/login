import { GoogleAuthService } from './utils/auth/google-auth.service.js';
import { NotificationService } from './utils/ui/notifications.js';
import { ModalService } from './utils/ui/modal.service.js';
import { setupCSP } from './utils/csp.js';
import { redirectToHome } from './utils/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  setupCSP();
  initializeUI();
  initializeAuth();
});

function initializeUI() {
  NotificationService.hideAllNotifications();
  ModalService.setupHandlers();
}

function initializeAuth() {
  GoogleAuthService.initialize((userData) => {
    NotificationService.showSuccess(`ようこそ、${userData.name}さん！`);
    setTimeout(() => redirectToHome(), 1000);
  });
}