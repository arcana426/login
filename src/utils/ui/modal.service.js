// Modal Service with accessibility improvements
import { FocusService } from './focus.service.js';
import { A11yService } from './a11y.service.js';

export class ModalService {
  static setupHandlers() {
    const modal = document.getElementById('customModal');
    const closeButton = modal?.querySelector('.close');

    if (closeButton) {
      closeButton.onclick = () => this.hideModal(modal);
    }

    window.onclick = (event) => {
      if (event.target === modal) {
        this.hideModal(modal);
      }
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.style.display === 'block') {
        this.hideModal(modal);
      }
    });
  }

  static showModal(title, message) {
    const modal = document.getElementById('customModal');
    if (!modal) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.textContent = message;

    modal.style.display = 'block';
    FocusService.trapFocus(modal);
    A11yService.announce(`${title}モーダルが開きました`);
  }

  static hideModal(modal) {
    if (modal) {
      modal.style.display = 'none';
      FocusService.releaseFocus();
      A11yService.announce('モーダルが閉じられました');
    }
  }
}