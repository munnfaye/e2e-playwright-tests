export const SELECTORS = {
    base_page: {
        pageTitle: ".title",
        hamburgerButton: ".bm-burger-button",
        textLogo: ".app_logo",
        cartButton: ".shopping_cart_link",
        cartBadde: ".shopping_cart_badge",
        navigationMenu: ".bm-menu",
        closeButton: "#react-burger-cross-btn",
    },

    login_page: {
        usernameInput: '#user-name',
        passwordInput: '#password',
        loginButton: '#login-button',
        errorMessage: '[data-test="error"]',
    },

    products_page: {
        pageTitle: '.title',
        inventoryList: '.inventory_list',
        productFilterButton: ".product_sort_container",
        productImage: ".inventory_item_img",
        productName: ".inventory_item_name",
        productDesc: ".inventory_item_desc",
        productPrice: ".inventory_item_price",
    },

    product_selectors: {
        backpack: {
            addToCartButton: "xpath=//button[@id='add-to-cart-sauce-labs-backpack']",
            removeButton: "xpath=//button[@id='remove-sauce-labs-backpack']",
        },
        bike_light: {
            addToCartButton: "xpath=//button[@id='add-to-cart-sauce-labs-bike-light']",
            removeButton: "xpath=//button[@id='remove-sauce-labs-bike-light']",
        },
        bolt_shirt: {
            addToCartButton: "xpath=//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']",
            removeButton: "xpath=//button[@id='remove-sauce-labs-bolt-t-shirt']",
        },
        fleece_jacket: {
            addToCartButton: "xpath=//button[@id='add-to-cart-sauce-labs-fleece-jacket']",
            removeButton: "xpath=//button[@id='remove-sauce-labs-fleece-jacket']",
        },
        onesie: {
            addToCartButton: "xpath=//button[@id='add-to-cart-sauce-labs-onesie']",
            removeButton: "xpath=//button[@id='remove-sauce-labs-onesie']",
        },
        red_shirt: {
            addToCartButton: "xpath=//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']",
            removeButton: "xpath=//button[@id='remove-test.allthethings()-t-shirt-(red)']",
        },
    }
} as const;

export type BasePageKey = keyof typeof SELECTORS.base_page;
export type LoginPageKey = keyof typeof SELECTORS.login_page;
export type ProductPageKey = keyof typeof SELECTORS.products_page;
export type ProductKey = keyof typeof SELECTORS.product_selectors;