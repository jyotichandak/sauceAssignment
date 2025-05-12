import { expect, type Locator, type Page } from '@playwright/test';


export class InventoryPage {

    //locators
    page: Page;
    productSort: Locator;
    cartLink: Locator;
    itemLabel: Locator
    itemPrice: Locator;
    addToCart: Locator;
    removeFromCart: Locator;
    shoppingCartBadge: Locator;
    inventoryItem: Locator;
    inventoryItemImage: Locator;
    inventoryURL: string;
    cartURL: string;


    //constructor
    constructor(page: Page) {
        this.page = page;
        this.inventoryURL = 'https://www.saucedemo.com/inventory.html';
        this.cartURL = 'https://www.saucedemo.com/cart.html';   
        this.productSort = page.locator('.product_sort_container');
        this.cartLink = page.locator('.shopping_cart_link');
        this.inventoryItem = page.locator('.inventory_item');
      //  this.itemLabel = page.locator("//div[@class='inventory_item']//div[@class='inventory_item_label']//a/div");
       this.itemLabel = page.locator("//div[@class='inventory_item_label']//a/div")  ;
      this.itemPrice = page.locator("//div[@class='inventory_item_price']");
        this.addToCart =page.getByRole('button', { name: 'Add to cart' });
        this.removeFromCart = page.getByRole('button', { name: 'Remove' });
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.inventoryItemImage = page.locator('.inventory_item_img');
    }

    //write method to check  z to A sort is applied for itemlabels
    async verifySortZToAForItemLabels(): Promise<void> {
        const itemLabels = await this.itemLabel.allInnerTexts();
        //code to print item labels in console
        console.log("Item Labels: ", itemLabels);
        const sortedLabels = [...itemLabels].sort((a, b) => b.localeCompare(a));
        //code to print sorted
        console.log("Item Labels: ", sortedLabels);
        //compare the arrays
        expect(itemLabels).toEqual(sortedLabels);
    }

    //write method to check high to low sort is applied for item prices
    async verifySortHighToLowForItemPrices(): Promise<void> {
        const itemPrices = await this.itemPrice.allInnerTexts();
        console.log("Item Prices: ", itemPrices);
        const sortedPrices = [...itemPrices].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
       console.log("Sorted Item Prices: ", sortedPrices);
        //compare the arrays
        expect(itemPrices).toEqual(sortedPrices);
    }   

   //write method to add item to cart
   async addItemToCart(i): Promise<string> {
        await this.inventoryItem.nth(i).locator(this.addToCart).click();     
        const addedItemText = this.inventoryItem.nth(i).locator(this.itemLabel).innerText()
        //check if remove button is visible 
        await this.inventoryItem.nth(i).locator(this.removeFromCart).waitFor({ state: 'visible' }); 
        return addedItemText;
    }

     //write method to remove item from cart
     async removeItemFromCart(i): Promise<string> {
        const removedItemText = this.inventoryItem.nth(i).locator(this.itemLabel).innerText();
        await this.removeFromCart.nth(i).click();  
        return removedItemText;
     }

//write code to check shoppingcartbadgecount
    async cartCount(): Promise<string> {   
        await this.shoppingCartBadge.waitFor({ state: 'visible' });
        const cartCount = await this.shoppingCartBadge.innerText();
        return cartCount;

    }




}