import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../locators/selectors";

export class BasePage {
    readonly page: Page;

    readonly hamburgerButton: Locator;
    readonly textLogo: Locator;
    readonly cartButton: Locator;
    readonly cartBadge: Locator;
    readonly navigationMenu: Locator;
    readonly closeButton: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        const base = SELECTORS.base_page;

        this.page = page;
        this.hamburgerButton = page.locator(base.hamburgerButton);
        this.textLogo = page.locator(base.textLogo);
        this.cartButton = page.locator(base.cartButton);
        this.cartBadge = page.locator(base.cartBadge);
        this.navigationMenu = page.locator(base.navigationMenu);
        this.closeButton = page.locator(base.closeButton);
        this.pageTitle = page.locator(base.pageTitle);
    }

    async navigateToCart() {
        await expect(this.cartButton).toBeVisible();
        await this.cartButton.click();
    }
}