import { setupCSP } from './utils/csp.js';
import { loadUserProfile, signOut } from './utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  setupCSP();
  
  // Load user profile
  const userProfile = loadUserProfile();
  if (!userProfile) {
    window.location.href = 'index.html';
    return;
  }

  // Display user information
  document.getElementById('userImage').src = userProfile.picture;
  document.getElementById('userName').textContent = userProfile.name;
  document.getElementById('userEmail').textContent = userProfile.email;

  // Setup sign out button
  document.getElementById('signoutButton').addEventListener('click', async () => {
    await signOut();
    window.location.href = 'index.html?signedout=true';
  });
});