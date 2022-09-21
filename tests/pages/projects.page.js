const { expect } = require("@playwright/test");

exports.ProjectsPage = class ProjectsPage {
    constructor(page) {
        this.page = page;
        this.countIssueslocator = ".pagination .items";
        this.operatorsStatusSelect = "#operators_status_id";
        this.optionIs = "=";
        this.valuesStatusSelect = "#values_status_id_1";
        this.optionClosed = "5";
        this.addFilterSelect = "#add_filter_select";
        this.optionTracker = "tracker_id";
        this.operatorsTrackerSelect = "#operators_tracker_id";
        this.valuesTrackerSelect = "#values_tracker_id_1";
        this.optionFeature = "2";
        this.submitButton = page.locator('.buttons [onclick^="submit"]');
        this.issuesList = page.locator(".list.issues");
        this.trackerColumnCells = page.locator("td.tracker");
        this.statusColumnCells = page.locator("td.status");
        this.resetFiltersLink = page.locator(".buttons .icon-reload");
    }

    async goto() {
        await this.page.goto("https://www.redmine.org/projects/redmine/issues");
    }

    async countIssues() {
        let totalIssuesString = await this.page.locator(this.countIssueslocator).textContent();
        return parseInt(totalIssuesString.match("/(.+)(.{1})")[1]);
    }

    async setFilters() {
        await this.page.selectOption(this.operatorsStatusSelect, this.optionIs);
        await this.page.selectOption(this.valuesStatusSelect, this.optionClosed);
        await this.page.selectOption(this.addFilterSelect, this.optionTracker);
        await this.page.selectOption(this.operatorsTrackerSelect, this.optionIs);
        await this.page.selectOption(this.valuesTrackerSelect, this.optionFeature);
        await this.submitButton.click();
    }

    async assertOnlySelectedFiltersInList() {
        await expect(this.issuesList).toBeVisible();
        let trackerColumnTexts = await this.trackerColumnCells.allTextContents();
        let statusColumnTexts = await this.statusColumnCells.allTextContents();
        trackerColumnTexts.every((elem) => elem == "Feature");
        statusColumnTexts.every((elem) => elem == "Closed");
    }

    async resetFilters() {
        await this.resetFiltersLink.click();
    }

    async assertNotOnlySelectedFiltersInList() {
        await expect(this.issuesList).toBeVisible();
        let trackerColumnTexts = await this.trackerColumnCells.allTextContents();
        let statusColumnTexts = await this.statusColumnCells.allTextContents();
        trackerColumnTexts.every((elem) => elem !== "Feature");
        statusColumnTexts.every((elem) => elem !== "Closed");
    }
};
