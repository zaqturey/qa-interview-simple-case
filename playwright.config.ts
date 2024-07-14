import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testDir: './test-setup/', testMatch: '*' },
    {
      name: 'chromium',
      testDir: './tests/',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
      dependencies: ['setup'],
    },
  ],
})
