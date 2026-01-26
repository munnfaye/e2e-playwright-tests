export const SELECTORS = {
    login: {
        usernameInput: '#user-name',
        passwordInput: '#password',
        loginButton: '#login-button',
        errorMessage: '[data-test="error"]',
    },

    products: {
        pageTitle: '.title',
        inventoryList: '.inventory_list',
    },
} as const;