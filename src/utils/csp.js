// CSP (Content Security Policy) configuration utilities
export function generateNonce(length = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array)).slice(0, length);
}

export function setupCSP() {
  const jsNonce = generateNonce();
  const cssNonce = generateNonce();

  const cspHeader = `
    default-src 'self'; 
    base-uri 'self'; 
    script-src 'self' 'nonce-${jsNonce}' https://accounts.google.com https://*.gstatic.com;
    style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net/npm/bulma@1.0.2/ https://accounts.google.com https://*.gstatic.com;
    frame-src 'self' https://accounts.google.com/;
    connect-src 'self' https://accounts.google.com/ https://*.google.com;
    img-src 'self' https://*.googleusercontent.com https://*.google.com https://*.gstatic.com;
    font-src 'self' https://*.gstatic.com;
  `
    .replace(/\s+/g, ' ')
    .trim();

  const metaCsp = document.getElementById('csp');
  if (metaCsp) {
    metaCsp.setAttribute('content', cspHeader);
  }

  return { jsNonce, cssNonce };
}
