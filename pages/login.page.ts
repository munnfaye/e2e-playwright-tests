import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../locators/selectors";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(SELECTORS.login.usernameInput);
    this.passwordInput = page.locator(SELECTORS.login.passwordInput);
    this.loginButton = page.locator(SELECTORS.login.loginButton);
    this.loginErrorMessage = page.locator(SELECTORS.login.errorMessage);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async verifyLoginPageLoaded() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterValidUsername(username: string) {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
  }

  async clearUsernameField() {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.clear();
  }

  async enterValidPassword(password: string) {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
  }

  async clearPasswordField() {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.clear();
  }

  async clickLoginButton() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator(SELECTORS.products.pageTitle)).toHaveText('Products');
    await expect(this.page.locator(SELECTORS.products.inventoryList)).toBeVisible();
  }
}
