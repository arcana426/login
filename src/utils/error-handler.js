// Error handling utilities
export const ErrorMessages = {
  LOAD_ASSET:
    'リソースのロードに失敗しました。ネットワーク接続を確認してください。',
  MISSING_ELEMENT: '必要なDOM要素が見つかりません。',
  CSP_FAILURE: 'CSPの設定に失敗しました。',
  GOOGLE_API_ERROR: 'Google APIの初期化に失敗しました。',
  LOGIN_FAILED: 'ログインに失敗しました。再試行してください。',
};

export function showModal(title, message) {
  const modal = document.getElementById('customModal');
  if (!modal) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');

  if (modalTitle) modalTitle.textContent = title;
  if (modalMessage) modalMessage.textContent = message;

  modal.style.display = 'block';

  const span = modal.querySelector('.close');
  if (span) {
    span.onclick = () => (modal.style.display = 'none');
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

export function logError(error, userMessage) {
  console.error(error);
  showModal('エラー', `${userMessage}\n\n詳細:\n${error.message || error}`);
}
