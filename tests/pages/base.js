const { expect } = require("@playwright/test");

exports.Base = class Base {
    constructor(page) {
        this.page = page;
        this.submitButton = page.locator('[type="submit"]');
    }
};