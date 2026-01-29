import { test } from "@playwright/test";
import { invalidPassword, invalidUser, lockedUser, testSetup, validPassword, validUser } from "../config/testSetup";

test.describe("Login Page Tests", () => {
  testSetup("Verify Login Page UI", async ({ loginPage }) => {
    await loginPage.verifyLoginPageLoaded();
  });

  testSetup(
    "Verify error displayed for invalid credentials",
    async ({ loginPage }) => {
      await loginPage.enterInvalidUsername(invalidUser);
      await loginPage.enterInvalidPassword(
        invalidPassword,
      );
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("invalidCredentials");
    });

  testSetup("Verify error displayed for locked user", async ({ loginPage }) => {
    await loginPage.enterLockedUsername(lockedUser);
    await loginPage.enterValidPassword(validPassword);
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage("lockedUser");
  });

  testSetup(
    "Verify error displayed when username is empty",
    async ({ loginPage }) => {
      await loginPage.enterValidPassword(validPassword);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("usernameRequired");
    }
  );

  testSetup(
    "Verify error displayed when password is empty",
    async ({ loginPage }) => {
      await loginPage.enterValidUsername(validUser);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("passwordRequired");
    }
  );

  testSetup(
    "Verify successful login with valid username & password",
    async ({ loginPage }) => {
      await loginPage.enterValidUsername(validUser);
      await loginPage.enterValidPassword(validPassword);
      await loginPage.clickLoginButton();
      await loginPage.verifySuccessfulLogin();
    }
  );
});
