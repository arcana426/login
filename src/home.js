import { setupCSP } from './utils/csp.js';
import { UserService } from './utils/auth/user.service.js';
import { AuthService } from './utils/auth/auth.service.js';
import { redirectToLogin } from './utils/navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  setupCSP();
  initializePage();
});

function initializePage() {
  const userProfile = UserService.loadUserProfile();
  if (!userProfile) {
    redirectToLogin();
    return;
  }

  displayUserProfile(userProfile);
  setupEventListeners();
}

function displayUserProfile(userProfile) {
  document.getElementById('userImage').src = userProfile.picture;
  document.getElementById('userName').textContent = userProfile.name;
  document.getElementById('userEmail').textContent = userProfile.email;
}

function setupEventListeners() {
  document.getElementById('signoutButton').addEventListener('click', async () => {
    await AuthService.signOut();
    redirectToLogin('signedout=true');
  });
}