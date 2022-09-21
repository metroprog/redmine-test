const { test, expect } = require("@playwright/test");
const { RegisterPage } = require("../pages/register.page.js");

test.describe("Register test", () => {
    test("Cannot register with already existing username and email", async ({ page }) => {
        const Register = new RegisterPage(page);
        await Register.goto();
        let userCreds = {
            login: "TestUser555",
            password: "1234",
            firstname: "Test",
            lastname: "User",
            email: "testuser@example.com",
        };
        await Register.register(userCreds);
        await expect(Register.loginErrorMessage).toHaveText("Login has already been taken");
        await expect(Register.emailErrorMessage).toHaveText("Email has already been taken");
    });
});
