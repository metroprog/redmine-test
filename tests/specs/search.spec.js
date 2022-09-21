const { test, expect } = require("@playwright/test");
const { SearchPage } = require("../pages/search.page.js");

test.describe("Search test", () => {
    test("Search should return only results containing the query", async ({ page }) => {
        const Search = new SearchPage(page);
        await Search.goto();
        await Search.search("ruby");
        await Search.assertQueryInEveryResultsItem("ruby");
        await Search.assertQueryTextHighlightedInResults();
    });
});
