const { expect } = require("@playwright/test");
const { Base } = require("./base.js");

exports.LoginPage = class LoginPage extends Base {
    constructor(page) {
        super(page);
        this.page = page;
        this.emailInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.flashErrorMessage = page.locator("#flash_error");
    }

    async goto() {
        await this.page.goto("https://www.redmine.org/login");
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
};
