# E2E Playwright Test
Automated end-to-end test for e-commerce platform using Playwright and TypeScript

## Prerequisites

Before you start, you should have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/e2e-playwright-test.git
cd e2e-playwright test
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure
```
e2e-playwright-tests/
│
├── locators/                   
│   └── selectors.ts           # Centralized selectors management
|
├── config/                   
│   └── testSetup.ts           # Fixtures, environment variables, base config
|
├── constants/                   
│   ├── testData.ts            # Test data (product keys, checkout info)
|   ├── uiConstants.ts         # UI button labels
|   └── validationMessages.ts  # Error and success messages
|
├── pages/                     
│   ├── LoginPage.ts           # Login functions
│   └── ProductsPage.ts        # Products and cart functions
│
├── tests/
│   ├── login-test.spec.ts     # Login page tests
│   └── product-test.spec.ts   # Product and cart pages tests
|
├── types/                     
│   ├── checkout.ts            # Checkout info interface
│
├── .gitignore                 # Git ignore rules
├── playwright.config.ts       # Playwright configuration
└── README.md                  # Project documentation
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test tests/login-test.spec.ts
npx playwright test tests/products-test.spec.ts
```

### View test report
```bash
npx playwright show-report
```

### Debug tests
```bash
npx playwright test --debug
```

## Contact

For questions or support, please open an issue in the repository.