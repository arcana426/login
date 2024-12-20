// Focus management service
export class FocusService {
  static #lastFocusedElement = null;

  static trapFocus(element) {
    this.#lastFocusedElement = document.activeElement;
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements.length) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable.focus();

    element.addEventListener('keydown', (e) => {
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

  static releaseFocus() {
    if (this.#lastFocusedElement) {
      this.#lastFocusedElement.focus();
      this.#lastFocusedElement = null;
    }
  }

  static setInitialFocus(element) {
    const focusTarget = element.querySelector('[autofocus]') || 
                       element.querySelector('input:not([type="hidden"])') ||
                       element;
    focusTarget.focus();
  }
}