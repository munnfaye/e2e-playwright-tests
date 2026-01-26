import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../locators/selectors";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  public static readonly ERRORS = ERROR_MESSAGES.login;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(SELECTORS.login_page.usernameInput);
    this.passwordInput = page.locator(SELECTORS.login_page.passwordInput);
    this.loginButton = page.locator(SELECTORS.login_page.loginButton);
    this.loginErrorMessage = page.locator(SELECTORS.login_page.errorMessage);
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

  async enterLockedUsername(username: string) {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
  }

  async enterInvalidUsername(username: string) {
    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
  }

  async enterInvalidPassword(password: string) {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.page.locator(SELECTORS.products_page.pageTitle)).toHaveText(
      "Products",
    );
    await expect(
      this.page.locator(SELECTORS.products_page.inventoryList),
    ).toBeVisible();
  }

  async verifyErrorMessage(errorType: keyof typeof ERROR_MESSAGES.login) {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toContainText(
      ERROR_MESSAGES.login[errorType],
    );
  }

  async closeErrorMessage() {
    const errorCloseButton = this.page.locator('[data-test="error"] button');
    await errorCloseButton.click();
    await expect(this.loginErrorMessage).not.toBeVisible();
  }
}
