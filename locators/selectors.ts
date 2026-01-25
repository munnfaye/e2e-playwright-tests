export const SELECTORS = {
    // Login Page
    login: {
        usernameInput: '#user-name',
        passwordInput: '#password',
        loginButton: '#login-button',
        errorMessage: '[data-test="error"]',
    },

    // Products Page
    products: {
        pageTitle: '.title',
        inventoryList: '.inventory_list',
    },
} as const;