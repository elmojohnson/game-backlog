import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly navbarTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbarTitle = page.getByTestId("navbar-title");
  }
}
