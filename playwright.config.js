const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

module.exports = defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry'
    },
    projects: [
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome'
            }
        }
    ],
    webServer: {
        command: `python3 -m http.server ${PORT} --bind 127.0.0.1`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI
    }
});
