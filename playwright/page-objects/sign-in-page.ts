import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class SignInPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.signInButton = page.getByTestId("sign-in-button");
  }

  async login(email: string, password: string) {
    await this.page.goto("/account/sign-in");
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    
    await this.page.waitForURL("**/")
    await expect(this.navbarTitle).toBeVisible();
  }
}
