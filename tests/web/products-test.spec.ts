import { test, expect } from "@playwright/test";
import { testSetup, validUser, validPassword } from "../../config/testSetup";
import { ProductsPage } from "../../pages/products.page";
import { PRODUCT_KEYS, CHECKOUT_DATA } from "../../constants/testData";

test.describe.serial("Products Page - UI Verification", () => {
    testSetup("Verify display products page with all elements", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.verifyProductsPage();
    });

    testSetup("Verify display product container and correct product count", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.verifyProductsAndDetails();
    });

    testSetup("Verify single product has all required elements", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        const firstProduct = productsPage.getProduct(0);
        await productsPage.verifySingleProduct(firstProduct);
    });

    testSetup("Verify all products have details", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        const productCount = await productsPage.products.count();

        for (let i = 0; i < productCount; i++) {
            const product = productsPage.getProduct(i);
            await productsPage.verifySingleProduct(product);
        }
    });
});

test.describe("Products Page - Add to Cart", () => {
    testSetup("Verify all products have Add to cart button initially", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.verifyAllProductsInitialButtonState();
    });

    testSetup("Verify able to add product to cart successfully", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(PRODUCT_KEYS[4]);

        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText('1');
    });

    testSetup("Verify specific product Add to cart button", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.verifyAddToCartButton(PRODUCT_KEYS[3]);
    });

    testSetup("Verify Remove button not visible initially", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.verifyRemoveButtonNotVisible(PRODUCT_KEYS[2]);
    });
});

test.describe("Products Page - Cart Navigation", () => {
    testSetup("Verify able to navigate to cart page successfully", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(PRODUCT_KEYS[1]);
        await productsPage.proceedToCart();

        await expect(page).toHaveURL(/cart.html/);
    });

    testSetup("Verify able proceed to checkout from cart", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(PRODUCT_KEYS[3]);
        await productsPage.proceedToCart();
        await productsPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout-step-one.html/);
    });
});

test.describe("Products Page - Complete Purchase Flow", () => {
    testSetup("Verify able to complete full purchase journey", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);

        await productsPage.addProductToCart(PRODUCT_KEYS[0]);
        await productsPage.proceedToCart();
        await productsPage.proceedToCheckout();
        await productsPage.fillCheckOutInformation(CHECKOUT_DATA);
        await productsPage.completePurchase();
        await productsPage.verifyOrderConfirmation();
    });

    testSetup("Verify checkout fills all required fields", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(PRODUCT_KEYS[2]);
        await productsPage.proceedToCart();
        await productsPage.proceedToCheckout();

        await productsPage.fillCheckOutInformation(CHECKOUT_DATA);

        await expect(page).toHaveURL(/checkout-step-two.html/);
    });

    testSetup("Verify order confirmation displays success message", async ({ loginPage, page }) => {
        await loginPage.enterValidUsername(validUser);
        await loginPage.enterValidPassword(validPassword);
        await loginPage.clickLoginButton();

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(PRODUCT_KEYS[5]);
        await productsPage.proceedToCart();
        await productsPage.proceedToCheckout();
        await productsPage.fillCheckOutInformation(CHECKOUT_DATA);
        await productsPage.completePurchase();

        await expect(page).toHaveURL(/checkout-complete.html/);
        await productsPage.verifyOrderConfirmation();
    });
});