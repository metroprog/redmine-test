const { test, expect } = require("@playwright/test");
const { RepositoryPage } = require("../pages/repository.page.js");

test.describe("Repository test", () => {
    test("Revision comparison should display selected revisions", async ({ page }) => {
        const Repository = new RepositoryPage(page);
        await Repository.goto();
        await Repository.selectRevisionsToCompare();
        await Repository.assertSelectedRevisionsPage();
    });
});
