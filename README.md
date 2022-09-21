# Redmine - Tests - Playwright

Web UI automated tests of [Redmine](https://redmine.org/) site with JavaScript + Playwright/Test + Allure reporter.


## Technologies

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Playwright](https://playwright.dev/)
- [Allure reporter](https://www.npmjs.com/package/allure-playwright)


## Installation

- Before using the framework, you need to install a [Node.js](https://nodejs.org/en/) LTS version 14 or latest.
  Check that Node.js is installed:
```
node -v
```
Check that package manager npm is installed:
```
npm -v
```
- In the root directory of a project, run:
```
git clone https://github.com/metroprog/redmine-test.git
npm install 
```

## Run tests

- Start test suite using the run command:
```
npx playwright test
```

## Reporting

- Generate Allure Report:
```
npx allure generate allure-results --clean
```
- Open Allure Report:
```
npx allure open allure-report
```
See example of reporting at: [gh-pages](https://metroprog.github.io/redmine-test/)