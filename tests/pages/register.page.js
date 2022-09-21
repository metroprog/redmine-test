const { expect } = require("@playwright/test");
const { Base } = require("./base.js");

exports.RegisterPage = class RegisterPage extends Base {
    constructor(page) {
        super(page);
        this.page = page;
        this.loginInput = page.locator("#user_login");
        this.passwordInput = page.locator("#user_password");
        this.passwordConfirmationInput = page.locator("#user_password_confirmation");
        this.firstnameInput = page.locator("#user_firstname");
        this.lastnameInput = page.locator("#user_lastname");
        this.emailInput = page.locator("#user_mail");
        this.loginErrorMessage = page.locator("#errorExplanation li:first-child");
        this.emailErrorMessage = page.locator("#errorExplanation li:nth-child(2)");
    }

    async goto() {
        await this.page.goto("https://www.redmine.org/account/register");
    }

    async register(creds) {
        await this.loginInput.fill(creds.login);
        await this.passwordInput.fill(creds.password);
        await this.passwordConfirmationInput.fill(creds.password);
        await this.firstnameInput.fill(creds.firstname);
        await this.lastnameInput.fill(creds.lastname);
        await this.emailInput.fill(creds.email);
        await this.submitButton.click();
    }
};
