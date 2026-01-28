import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { SELECTORS } from "../locators/selectors";
import { CHECKOUT_DATA, EXPECTED_PRODUCT_COUNT, PRODUCT_KEYS } from "../constants/testData";
import { BUTTON_TEXT } from "../constants/uiConstants";
import { CheckoutInfo } from "../types/checkout";
import { VALIDATION_MESSAGES } from "../constants/validationMessages";

export class ProductsPage extends BasePage {
  readonly productFilterButton: Locator;
  readonly productContainer: Locator;
  readonly products: Locator;
  readonly productImage: Locator;
  readonly productName: Locator;
  readonly productDesc: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);

    const products = SELECTORS.products_page;

    this.productFilterButton = page.locator(products.productFilterButton);
    this.productContainer = page.locator(products.inventoryList);
    this.products = page.locator(".inventory_item");
    this.productImage = page.locator(products.productImage);
    this.productName = page.locator(products.productName);
    this.productDesc = page.locator(products.productDesc);
    this.productPrice = page.locator(products.productPrice);
  }

  getProductsListItem(item: string): Locator {
    return this.page.locator(`option[value=${item}]`);
  }

  getProduct(index: number): Locator {
    return this.products.nth(index);
  }

  getProductElements(product: Locator) {
    const productsSelectors = SELECTORS.products_page;

    return {
      image: product.locator(productsSelectors.productImage),
      name: product.locator(productsSelectors.productName),
      description: product.locator(productsSelectors.productDesc),
      price: product.locator(productsSelectors.productPrice),
      addToCartButton: product.locator('button[id^="add-to-cart"]'),
      removeButton: product.locator('button[id^="remove"]'),
    };
  }

  getProductButtons(productKey: keyof typeof SELECTORS.product_selectors) {
    const productSelectors = SELECTORS.product_selectors[productKey];

    return {
      addToCartButton: this.page.locator(productSelectors.addToCartButton),
      removeButton: this.page.locator(productSelectors.removeButton),
    };
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

  async verifyProductsAndDetails() {
    await expect(this.productContainer).toBeVisible();
    await expect(this.products).toHaveCount(EXPECTED_PRODUCT_COUNT);
  }

  async verifySingleProduct(product: Locator) {
    const elements = this.getProductElements(product);

    await expect(elements.name).toBeVisible();
    const nameText = await elements.name.textContent();
    expect(nameText?.trim().length).toBeGreaterThan(0);

    await expect(elements.description).toBeVisible();
    const descText = await elements.description.textContent();
    expect(descText?.trim().length).toBeGreaterThan(0);

    await expect(elements.price).toBeVisible();
    const priceText = await elements.price.textContent();
    expect(priceText).toMatch(/^\$\d+\.\d{2}$/);

    await expect(elements.addToCartButton).toBeVisible();
    await expect(elements.addToCartButton).toBeEnabled();
    await expect(elements.addToCartButton).toHaveText(BUTTON_TEXT.addToCart);
  }

  async verifyAddToCartButton(
    productKey: keyof typeof SELECTORS.product_selectors,
  ) {
    const buttons = this.getProductButtons(productKey);

    await expect(buttons.addToCartButton).toBeVisible();
    await expect(buttons.addToCartButton).toBeEnabled();
    await expect(buttons.addToCartButton).toHaveText(BUTTON_TEXT.addToCart);
  }

  async verifyRemoveButtonNotVisible(
    productKey: keyof typeof SELECTORS.product_selectors,
  ) {
    const buttons = this.getProductButtons(productKey);

    await expect(buttons.removeButton).not.toBeVisible();
  }

  async verifyAllProductsInitialButtonState() {
    for (const productKey of PRODUCT_KEYS) {
      await this.verifyAddToCartButton(productKey);
      await this.verifyRemoveButtonNotVisible(productKey);
    }
  }

  async addProductToCart(productKey: keyof typeof SELECTORS.product_selectors) {
    const buttons = this.getProductButtons(productKey);

    await expect(buttons.addToCartButton).toBeVisible();
    await buttons.addToCartButton.click();
  }

  async proceedToCart() {
    await this.cartButton.click();
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async proceedToCheckout() {
    const checkoutButton = this.page.locator(
      SELECTORS.cart_page.checkoutButton,
    );

    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }

  async fillCheckOutInformation(info: CheckoutInfo) {
    const checkout = SELECTORS.checkout_page;

    const firstNameInput = this.page.locator(checkout.firstNameInput);
    const lastNameInput = this.page.locator(checkout.lastNameInput);
    const postalCodeInput = this.page.locator(checkout.postalCodeInput);
    const continueButton = this.page.locator(checkout.continueButton);

    await expect(firstNameInput).toBeVisible();
    await firstNameInput.fill(CHECKOUT_DATA.firstName);

    await expect(lastNameInput).toBeVisible();
    await lastNameInput.fill(CHECKOUT_DATA.lastName);

    await expect(postalCodeInput).toBeVisible();
    await postalCodeInput.fill(CHECKOUT_DATA.postalCode);

    await continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }

  async completePurchase() {
    const finishButton = this.page.locator(
      SELECTORS.checkout_page.finishButton,
    );
    await expect(finishButton).toBeVisible();
    await finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete.html/);
  }

  async verifyOrderConfirmation() {
    const confirmation = SELECTORS.confirmation_page;
    const messages = VALIDATION_MESSAGES.confirmation;

    const confirmationHeader = this.page.locator(
      confirmation.confirmationHeader,
    );
    const confirmationText = this.page.locator(confirmation.confirmationText);

    await expect(confirmationHeader).toBeVisible();
    await expect(confirmationHeader).toHaveText(messages.orderCompleteHeader);

    await expect(confirmationText).toBeVisible();
    await expect(confirmationText).toContainText(messages.orderCompleteText);
  }
}
