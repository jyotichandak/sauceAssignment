import { type Locator, type Page , expect} from '@playwright/test'
//import { InventoryPage } from './InventoryPage';

export class CheckoutPage {

    //locators
    page: Page;
    cartItemName: Locator;
    cartItemPrice: Locator;
    cartItemDesc: Locator;
    continueShopping: Locator;
    checkOut: Locator;
    continue: Locator;
    overviewItemTotal: Locator;
    overviewTotalPrice: Locator;


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.cartItemName = page.locator(".inventory_item_name");
        this.cartItemPrice = page.locator(".inventory_item_price");
        this.cartItemDesc = page.locator('.inventory_item_desc')
        this.continueShopping = page.locator("#continue-shopping");
        this.checkOut = page.locator("#checkout");
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.overviewItemTotal = page.locator(".summary_subtotal_label");
        this.overviewTotalPrice = page.locator(".summary_total_label");

    }

    //write method to get all cart items names on the checkout page   
    async getAllCartItemNames(): Promise<string[]> {
        return await this.cartItemName.allTextContents();
    }

    async getAllCartItemDec(): Promise<string[]> {
        return await this.cartItemDesc.allTextContents();
    }

    async getAllCartItemPrices(): Promise<string[]> {
        return await this.cartItemPrice.allTextContents();
    }

    //write method to get all cart items prices and find sum
    async getAllCartItemPricesSum(): Promise<{ total: number }> {
        const pricesText = await this.cartItemPrice.allTextContents();
        const prices = pricesText.map(price => parseFloat(price.replace('$', '')));
        let total = 0;
        //= prices.reduce((sum, price) => sum + price, 0);
        for (const p of prices) {
            total = total + p;
        }
        console.log("Total price : ", total)
        return { total };
    }

    async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
        await this.page.locator("#first-name").fill(firstName);
        await this.page.locator("#last-name").fill(lastName);
        await this.page.locator("#postal-code").fill(zipCode);

    }

    async checkOutOverviewPage(totalPrice: number) {
        await this.page.waitForTimeout(3000);
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        await expect(this.page.locator(".title")).toHaveText("Checkout: Overview");
        await expect(this.overviewItemTotal).toHaveText(`Total: $${totalPrice.toFixed(2)}`);
    }


    // method to retun mutidimentional array with values for each inventory item
    async addedInventoryDetails(): Promise<{ name: string; price: string; description: string }[]> {
        const cartItemNames = await this.getAllCartItemNames();
        console.log("Cart Item Names: ", cartItemNames);
        //get all cart items prices on the checkout page
        const cartItemPrices = await this.getAllCartItemPrices();
        console.log("Cart Item Prices: ", cartItemPrices);
        //get all cart item descriptions
        const cartItemDescriptions = await this.getAllCartItemDec();
        console.log("Cart item descs : ", cartItemDescriptions)

        const inventoryDetails = cartItemNames.map((name, index) => ({
            name,
            price: cartItemPrices[index],
            description: cartItemDescriptions[index],
        }));

        return inventoryDetails;
    }



}