```markdown
# Sauce Assignment

## Prerequisites

Before setting up and running the tests, ensure you have the following installed:

1. **Node.js**: Install the latest LTS version of Node.js from [Node.js official website](https://nodejs.org/).
2. **Git**: Install Git from [Git official website](https://git-scm.com/).
3. **Playwright**: This project uses Playwright for end-to-end testing. It will be installed as part of the setup process.
4. **Supported Browsers**: Ensure you have the latest versions of Chromium, Firefox, and WebKit installed. Playwright will handle browser dependencies automatically.

## Setup Instructions

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sauceAssignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize Playwright:
   ```bash
   npx playwright install
   ```

4. Configure the project:
   - Update the `playwright.config.ts` file to include the following settings:
     ```javascript
     use: {
       headless: false,
       screenshot: 'on',
       expect: {
         toHaveScreenshot: { maxDiffPixelRatio: 0.01, threshold: 0.1 },
       },
       snapshotPathTemplate: '.test/snaps/{projectName}/{testFilePath}/{arg}{ext}',
     }
     ```

## Running Tests

### Run All Tests
To execute all tests, use the following command:
```bash
npx playwright test
```

### Run Specific Tests
To run a specific test file, use:
```bash
npx playwright test inventory_1.spec.ts
```

### Test Execution Logs and Reports
1. After running the tests, a detailed HTML report will be generated in the `playwright-report/` directory.
2. To view the report, open the `playwright-report/index.html` file in your browser:
   ```bash
   npx playwright show-report
   ```

3. Screenshots of failed tests will be saved in the `screenshots/` directory.
4. Test results, including snapshots and logs, will be stored in the `test-results/` directory.

## Additional Notes

- Tests are configured to run in parallel by default. If tests are dependent, use the `serial` mode in the spec file:
  ```javascript
  test.describe.configure({ mode: 'serial' });
  ```

- For visual testing, snapshots are stored in the default directory under `tests/`. 

- For any issues or questions, refer to the Playwright documentation: [Playwright Docs](https://playwright.dev/).

Happy Testing!
```  