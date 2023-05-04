import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? "100%" : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    // Twin:te ユーザの大半はモバイルからの利用なので、モバイルに絞ってテストを書く
    // PC のレイアウトも考慮すると要素の表示・非表示など考慮することが多くなるため
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'VITE_API_URL=http://localhost:8080/api/v3 yarn preview',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
});
