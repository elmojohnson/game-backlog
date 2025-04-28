import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class SignInPage extends BasePage {
  readonly emailInput: Locator;
  readonly emailErrorMsg: Locator;
  readonly passwordInput: Locator;
  readonly passwordErroMsg: Locator;
  readonly signInButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId("email-input");
    this.emailErrorMsg = page.getByTestId("email-error-message");
    this.passwordInput = page.getByTestId("password-input");
    this.passwordErroMsg = page.getByTestId("password-error-message");
    this.signInButton = page.getByTestId("sign-in-button");
    this.errorAlert = page.getByTestId("error-alert");
  }

  async goToPage() {
    await this.page.goto("/account/sign-in");
  }

  async fillUpSignInForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async assertSignInSuccess() {
    await this.page.waitForURL("**/")
    await expect(this.navbarTitle).toBeVisible();
  }

}
