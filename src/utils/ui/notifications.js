export class NotificationService {
  static showError(message) {
    this.showNotification('error-message', message);
    this.hideNotification('success-message');
  }

  static showSuccess(message) {
    this.showNotification('success-message', message);
    this.hideNotification('error-message');
  }

  static hideAllNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
      notification.style.display = 'none';
    });
  }

  static showNotification(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.style.display = 'block';
    }
  }

  static hideNotification(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = 'none';
    }
  }
}