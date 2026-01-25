import { test } from "@playwright/test";
import { testSetup, validPassword, validUser } from "../config/testSetup";

test.describe("Login Page Flow", () => {
  testSetup("Verify Login Page UI", async ({ loginPage }) => {
    await loginPage.verifyLoginPageLoaded();
  });

  testSetup(
    "Verify Login With Valid Username & Password",
    async ({ loginPage }) => {
      await loginPage.enterValidUsername(validUser);
      await loginPage.enterValidPassword(validPassword);
      await loginPage.clickLoginButton();
      
      // Verify successful login
      await loginPage.verifySuccessfulLogin();
    }
  );
});
