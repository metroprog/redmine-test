const { test, expect } = require("@playwright/test");
const { ProjectsPage } = require("../pages/projects.page.js");

test.describe("Issues test", () => {
    test("Filters on Issues should display only specific records", async ({ page }) => {
        const Projects = new ProjectsPage(page);
        await Projects.goto();
        let totalIssues = await Projects.countIssues();
        await Projects.setFilters();
        await Projects.assertOnlySelectedFiltersInList();
        let filteredIssues = await Projects.countIssues();
        expect(filteredIssues).toBeLessThan(totalIssues);
        await Projects.resetFilters();
        await Projects.assertNotOnlySelectedFiltersInList();
        let notFilteredIssues = await Projects.countIssues();
        expect(notFilteredIssues).toEqual(totalIssues);
    });
});
