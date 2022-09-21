const { expect } = require("@playwright/test");
const { Base } = require("./base.js");

exports.SearchPage = class SearchPage extends Base {
    constructor(page) {
        super(page);
        this.page = page;
        this.searchInput = page.locator("#search-input");
        this.searchResults = page.locator("#search-results");
        this.resultsDescription = page.locator("#search-results .description");
        this.queryTextsInResults = page.locator(
            '//*[@class="description"]//*[concat(starts-with(text(),"R") or starts-with(text(),"r"), "uby")]'
        );
        this.highlightedClass = /highlight/;
    }

    async goto() {
        await this.page.goto("https://www.redmine.org/projects/redmine/search");
    }

    async search(q) {
        await this.searchInput.fill(q);
        await this.submitButton.click();
    }

    async assertQueryInEveryResultsItem(q) {
        await expect(this.searchResults).toBeVisible();
        let resultsDescriptionTexts = await this.resultsDescription.allTextContents();
        let qRegex = `[${q[0].toUpperCase() + q[0].toLowerCase()}]${q.slice(1)}`;
        resultsDescriptionTexts.every((elem) => elem.search(qRegex));
    }

    async assertQueryTextHighlightedInResults() {
        const count = await this.queryTextsInResults.count();
        for (let i = 0; i < count; ++i) {
            await expect(this.queryTextsInResults.nth(i)).toHaveClass(this.highlightedClass);
        }
    }
};
