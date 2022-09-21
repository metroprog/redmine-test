const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login.page.js");

test.describe("Login test", () => {
    test("Сannot login with unregistered credentials", async ({ page }) => {
        const Login = new LoginPage(page);
        await Login.goto();
        await Login.login("67084b15c84ff", "1234");
        await expect(Login.flashErrorMessage).toHaveText("Invalid user or password");
    });
});
