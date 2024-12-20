// Theme Service for handling color schemes and preferences
export class ThemeService {
  static init() {
    this.setupColorSchemeListener();
    this.setupFontSizeControls();
    this.applyInitialPreferences();
  }

  static setupColorSchemeListener() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateColorScheme = (e) => {
      document.documentElement.classList.toggle('dark-mode', e.matches);
    };

    darkModeMediaQuery.addListener(updateColorScheme);
    updateColorScheme(darkModeMediaQuery);
  }

  static setupFontSizeControls() {
    const fontSizeControls = document.querySelectorAll('[data-font-size]');
    
    fontSizeControls.forEach(control => {
      control.addEventListener('click', () => {
        const size = control.dataset.fontSize;
        document.documentElement.style.fontSize = size;
        localStorage.setItem('preferred-font-size', size);
      });
    });
  }

  static applyInitialPreferences() {
    // Apply saved font size preference
    const savedFontSize = localStorage.getItem('preferred-font-size');
    if (savedFontSize) {
      document.documentElement.style.fontSize = savedFontSize;
    }

    // Apply high contrast if needed
    if (window.matchMedia("(forced-colors: active)").matches) {
      document.documentElement.classList.add('high-contrast');
    }
  }
}