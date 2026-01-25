import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

export interface TestFixtures {
  loginPage: LoginPage;
}

export const baseURL = process.env.BASE_URL || "https://www.saucedemo.com";

export const validUser = process.env.VALID_USER || "standard_user";

export const validPassword = process.env.VALID_PASSWORD || "secret_sauce";

export const testSetup = test.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseURL);
    await use(loginPage);
  },
});
