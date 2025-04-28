import { test } from "../my-test";

test("Login user", async ({ signInPage }) => {
    await signInPage.login("test@test.com", "pass123");
})