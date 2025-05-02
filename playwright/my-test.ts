import { test as base } from "@playwright/test";
import { BasePage } from "./page-objects/base-page";
import { SignInPage } from "./page-objects/sign-in-page";

type MyFixtures = {
  basePage: BasePage;
  signInPage: SignInPage;
};

export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});
