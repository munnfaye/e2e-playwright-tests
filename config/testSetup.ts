import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { ProductsPage } from "../pages/products.page";

export interface TestFixtures {
  loginPage: LoginPage;
  productsPage: ProductsPage;
}

export const baseURL = "https://www.saucedemo.com";

export const validUser = "standard_user";
export const lockedUser = "locked_out_user";
export const validPassword = "secret_sauce";

export const invalidUser = "invalid_user";
export const invalidPassword = "invalid_password";

export const testSetup = test.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseURL);
    await page.context().clearCookies();
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await  use(productsPage);
  },
});