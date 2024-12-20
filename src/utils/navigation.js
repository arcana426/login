export function redirectToLogin(params = '') {
  window.location.href = `index.html${params ? '?' + params : ''}`;
}

export function redirectToHome() {
  window.location.href = 'home.html';
}