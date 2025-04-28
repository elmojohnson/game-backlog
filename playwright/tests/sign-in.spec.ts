import { expect } from "@playwright/test";
import { test } from "../my-test";

test.beforeEach(async ({ signInPage }) => {
  await signInPage.goToPage();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Sign in user", async ({ signInPage }) => {
  await signInPage.fillUpSignInForm("test@test.com", "pass123");
  await signInPage.assertSignInSuccess();
});

test("Empty credentials", async ({ signInPage }) => {
  await signInPage.fillUpSignInForm("", "");
  await expect(signInPage.emailErrorMsg).toContainText("Email is required");
  await expect(signInPage.passwordErroMsg).toContainText("Password is required");
});

test("Incorrect credentials", async ({ signInPage }) => {
  await signInPage.fillUpSignInForm("random-email@test.com", "randomPassword123");
  await expect(signInPage.errorAlert).toContainText("Invalid login credentials");
});