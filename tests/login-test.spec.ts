import { test } from "@playwright/test";
import { invalidUser, lockedUser, testSetup, validPassword, validUser } from "../config/testSetup";

test.describe("Login Page Flow", () => {
  testSetup("Verify Login Page UI", async ({ loginPage }) => {
    await loginPage.verifyLoginPageLoaded();
  });

  testSetup(
    "Verify error displayed for invalid credentials",
    async ({ loginPage }) => {
      await loginPage.enterInvalidUsername(invalidUser as string);
      await loginPage.enterInvalidPassword(
        process.env.INVALID_PASSWORD as string,
      );
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("invalidCredentials");
    });

  testSetup("Verify error displayed for locked user", async ({ loginPage }) => {
    await loginPage.enterLockedUsername(lockedUser as string);
    await loginPage.enterValidPassword(validPassword as string);
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessage("lockedUser");
  });

  testSetup(
    "Verify error displayed when username is empty",
    async ({ loginPage }) => {
      await loginPage.enterValidPassword(validPassword as string);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("usernameRequired");
    }
  );

  testSetup(
    "Verify error displayed when password is empty",
    async ({ loginPage }) => {
      await loginPage.enterValidUsername(validUser as string);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage("passwordRequired");
    }
  );

  testSetup(
    "Verify Login With Valid Username & Password",
    async ({ loginPage }) => {
      await loginPage.enterValidUsername(validUser as string);
      await loginPage.enterValidPassword(validPassword as string);
      await loginPage.clickLoginButton();

      // Verify successful login
      await loginPage.verifySuccessfulLogin();
    }
  );
});
