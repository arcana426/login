// Error message constants
export const ERROR_MESSAGES = {
  VALIDATION: {
    USERNAME_LENGTH: 'ユーザー名は3文字以上である必要があります。',
    INVALID_EMAIL: '有効なメールアドレスを入力してください。',
    PASSWORD_LENGTH: 'パスワードは8文字以上である必要があります。',
    INVALID_USER_DATA: 'ユーザーデータが無効です。'
  },
  AUTH: {
    LOGIN_FAILED: 'ログインに失敗しました。再試行してください。',
    LOGOUT_FAILED: 'サインアウト中にエラーが発生しました。',
    GOOGLE_INIT_FAILED: 'Google認証の初期化に失敗しました。'
  },
  SYSTEM: {
    LOAD_ASSET: 'リソースのロードに失敗しました。ネットワーク接続を確認してください。',
    MISSING_ELEMENT: '必要なDOM要素が見つかりません。',
    CSP_FAILURE: 'CSPの設定に失敗しました。',
    JWT_DECODE_FAILED: 'トークンの解析に失敗しました。',
    STORAGE_ERROR: 'データの保存に失敗しました。'
  }
};