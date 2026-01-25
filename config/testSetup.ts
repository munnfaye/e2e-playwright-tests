import { test } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import dotenv from "dotenv";

dotenv.config();

export interface TestFixtures {
  loginPage: LoginPage;
}

export const baseURL = process.env.BASE_URL || "https://www.saucedemo.com";

export const validUser = process.env.VALID_USER;
export const lockedUser = process.env.LOCKED_USER;
export const validPassword = process.env.VALID_PASSWORD;

export const invalidUser = process.env.INVALID_USER;
export const invalidPassword = process.env.INVALID_PASSWORD;

export const testSetup = test.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(baseURL);
    await page.context().clearCookies();
    await use(loginPage);
  },
});