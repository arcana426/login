// Accessibility Service
export class A11yService {
  static setupA11y() {
    this.setupFocusTrap();
    this.setupKeyboardNavigation();
    this.announcePageChanges();
  }

  static setupFocusTrap() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
              }
            }
          }
        });
      }
    });
  }

  static setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[style*="display: block"]');
        if (modal) {
          modal.style.display = 'none';
        }
      }
    });
  }

  static announcePageChanges() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only');
    document.body.appendChild(announcer);

    // Monitor route changes and update announcer
    window.addEventListener('popstate', () => {
      const pageTitle = document.title;
      announcer.textContent = `ページが変更されました: ${pageTitle}`;
    });
  }

  static announce(message) {
    const announcer = document.querySelector('[aria-live="polite"]');
    if (announcer) {
      announcer.textContent = message;
    }
  }
}