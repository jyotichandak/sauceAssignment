import { expect, type Locator, type Page } from '@playwright/test';


export class InventoryPage {

    //locators
    page: Page;
    productSort: Locator;
    cartLink: Locator;
    itemLabel: Locator
    itemPrice: Locator;


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.productSort = page.locator('.product_sort_container');
        this.cartLink = page.locator('.shopping_cart_link');
        this.itemLabel = page.locator("//div[@class='inventory_item']//div[@class='inventory_item_label']//a/div");
        this.itemPrice = page.locator("//div[@class='inventory_item']//div[@class='inventory_item_price']");
    }

    //write method to check  z to A sort is applied for itemlabels
    async verifySortZToAForItemLabels(): Promise<void> {
        const itemLabels = await this.itemLabel.allInnerTexts();
        const sortedLabels = [...itemLabels].sort((a, b) => b.localeCompare(a));
        expect(itemLabels).toEqual(sortedLabels);
    }

    //write method to check high to low sort is applied for item prices
    async verifySortHighToLowForItemPrices(): Promise<void> {
        const itemPrices = await this.itemPrice.allInnerTexts();
        const sortedPrices = [...itemPrices].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
        expect(itemPrices).toEqual(sortedPrices);
    }   



}