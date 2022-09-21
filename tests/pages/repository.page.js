const { expect } = require("@playwright/test");
const { Base } = require("./base.js");

exports.RepositoryPage = class RepositoryPage extends Base {
    constructor(page) {
        super(page);
        this.page = page;
        this.searchInput = page.locator("#search-input");
        this.firstRevision = page.locator(".changesets tr:nth-child(2) .id a");
        this.secondRevision = page.locator(".changesets tr:nth-child(5) .id a");
        this.firstRevisionRadiobutton = page.locator("#cb-2");
        this.secondRevisionRadiobutton = page.locator("#cbto-5");
        this.title = page.locator("h2");
    }

    async goto() {
        await this.page.goto("https://www.redmine.org/projects/redmine/repository");
    }

    async selectRevisionsToCompare() {
        this.firstRevisionToCompare = await this.firstRevision.textContent();
        this.secondRevisionToCompare = await this.secondRevision.textContent();
        await this.firstRevisionRadiobutton.click();
        await this.secondRevisionRadiobutton.click();
        await this.submitButton.click();
    }

    async assertSelectedRevisionsPage() {
        await this.title.waitFor();
        await expect(this.page).toHaveURL(
            new RegExp(`&rev=${this.firstRevisionToCompare}&rev_to=${this.secondRevisionToCompare}`)
        );
        await expect(this.title).toContainText(`${this.secondRevisionToCompare}:${this.firstRevisionToCompare}`);
    }
};
