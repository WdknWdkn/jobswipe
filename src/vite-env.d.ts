/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_AI_MODEL: string;
  readonly VITE_EMAIL_API_URL: string;
  // 他の環境変数がある場合、ここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 