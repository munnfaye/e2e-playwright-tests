import { CheckoutInfo } from "../types/checkout";

export const PRODUCT_KEYS = [
    'backpack',
    'bike_light',
    'bolt_shirt',
    'fleece_jacket',
    'onesie',
    'red_shirt',
] as const;

export const EXPECTED_PRODUCT_COUNT = 6;

export const CHECKOUT_DATA: CheckoutInfo = {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345",
};

export type ProductKey = typeof PRODUCT_KEYS[number];