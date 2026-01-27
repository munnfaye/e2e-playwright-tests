import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { SELECTORS } from "../locators/selectors";
import { NAVIGATION_ITEMS, FILTER_OPTIONS, SOCIAL_ITEMS } from "../constants/uiConstants";

export class ProductsPage extends BasePage {
    readonly productFilterButton: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        super(page);

        const products = SELECTORS.products_page;

        this.productFilterButton = page.locator(products.productFilterButton);
        this.productPrice = page.locator(products.productPrice);
    }

    getNavigationListItem(item: string): Locator {
        return this.page.locator(`#${item}_sidebar_link`);
    }

    getProductsListItem(item: string): Locator {
        return this.page.locator(`option[value=${item}]`);
    }

    getSocialListItem(item: string): Locator {
        return this.page.locator(`.social_${item}`);
    }

    async verifyProductsPage() {
        await expect(this.hamburgerButton).toBeVisible();
        await expect(this.textLogo).toBeVisible();
        await expect(this.textLogo).toHaveText("Swag Labs");
        await expect(this.cartButton).toBeVisible();
        await expect(this.pageTitle).toBeVisible();
        await expect(this.pageTitle).toHaveText("Products");
        await expect(this.productFilterButton).toBeVisible();
    }

    async openSideMenu() {
        await expect(this.hamburgerButton).toBeVisible();
        await this.hamburgerButton.click();
    }

    async verifyNavigationList() {
        await expect(this.closeButton).toBeVisible();
        for (const items of NAVIGATION_ITEMS) {
            await expect(this.getNavigationListItem(items)).toBeVisible();
        }
    }

    async closeSideMenu() {
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
    }
}