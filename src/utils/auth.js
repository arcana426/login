import { showError } from './notifications.js';

export function loadUserProfile() {
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const picture = localStorage.getItem('userImage');

  if (!name || !email || !picture) {
    return null;
  }

  return { name, email, picture };
}

export async function signOut() {
  try {
    // Clear Google Sign-In state
    if (google?.accounts?.id) {
      google.accounts.id.disableAutoSelect();
    }
    
    // Clear local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userImage');
    
    return true;
  } catch (error) {
    showError('サインアウト中にエラーが発生しました。');
    throw error;
  }
}

export async function registerUser(username, email, password) {
  // This is a placeholder for actual registration logic
  // In a real application, this would make an API call to your backend
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate input
  if (username.length < 3) {
    throw new Error('ユーザー名は3文字以上である必要があります。');
  }
  
  if (!email.includes('@')) {
    throw new Error('有効なメールアドレスを入力してください。');
  }
  
  if (password.length < 8) {
    throw new Error('パスワードは8文字以上である必要があります。');
  }

  // In a real application, you would send this data to your backend
  // and handle the response accordingly
  return true;
}