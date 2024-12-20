export function saveUserData(payload) {
  if (!payload?.name || !payload?.email || !payload?.picture) {
    throw new Error('Invalid user data payload');
  }

  localStorage.setItem('userName', payload.name);
  localStorage.setItem('userEmail', payload.email);
  localStorage.setItem('userImage', payload.picture);
}