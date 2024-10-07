import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // 環境設定（Node.js環境でテストを実行）
  },
});
