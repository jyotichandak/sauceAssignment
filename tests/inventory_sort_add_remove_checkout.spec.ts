import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';


let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let addedItems: string[] = [];


test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  checkoutPage = new CheckoutPage(page);
  //login to the application
  await loginPage.validateLoginForStdUser();
});


test('verify inventory items are sorted from Z to A @sortza', async ({ }) => {
  //sort items from Z to A
  await inventoryPage.productSort.selectOption({ label: 'Name (Z to A)' });
  //verify items are sorted from Z to A
  await inventoryPage.verifySortZToAForItemLabels();

});

test('verify inventory items are sorted by price from high to low', async ({ }) => {
  //sort items from high to low
  await inventoryPage.productSort.selectOption({ label: 'Price (high to low)' });
  //verify items are sorted from Z to A
  await inventoryPage.verifySortHighToLowForItemPrices();
});


test('verify the cart badge count @badge11', async ({ }) => {
  //add 3 items to cart and save the itemText to an array
  for (let i = 0; i < 3; i++) {
    //add item to cart        
    const addedItemText = await inventoryPage.addItemToCart(i);
    addedItems.push(addedItemText);
  }

  console.log("Added Items: ", addedItems);
  //verify item is added to cart
  await expect(inventoryPage.shoppingCartBadge).toHaveText('3');

});


test('verify the cart items are same as the added items', async ({ }) => {
  //click on cart icon
  await inventoryPage.cartLink.click();
  //get all cart items names on the checkout page
  const cartItemNames = await checkoutPage.getAllCartItemNames();
  console.log("Cart Item Names: ", cartItemNames);
  //compare the arrays
  expect.soft(cartItemNames).toEqual(addedItems);
});


test('verify the removed item is not in the cart', async ({ }) => {
  //click on cotinue shopping button
  await checkoutPage.continueShopping.click();
  //remove item from cart
  const removedItemName = await inventoryPage.removeItemFromCart(0);
  //click on cart icon
  await inventoryPage.cartLink.click();
  //get all cart items names on the checkout page
  const cartItemNames = await checkoutPage.getAllCartItemNames();
  console.log("Cart Item Names: ", cartItemNames);
  //compare the arrays
  expect(cartItemNames).not.toContain(removedItemName);
});


test('verify checkoutoverview page for inventory details', async ({ }) => {
   //cart inventirydetails
  const cartInventoryDetails = await checkoutPage.addedInventoryDetails();
  console.log(cartInventoryDetails);

  // click on checkout button
  await checkoutPage.checkOut.click();
  //fill checkout info
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  //click continue button
  await checkoutPage.continue.click();

  //overview page inventoryDetails
  const overviewInventoryDetails = await checkoutPage.addedInventoryDetails();
  console.log(overviewInventoryDetails);

  //compare inventories from 2 pages
  expect(cartInventoryDetails).toEqual(overviewInventoryDetails);
});

test('verify checkout overview page total price', async ({ }) => {
  //get all cart items prices sum on the checkout page
  const cartItemPricesSum = await checkoutPage.getAllCartItemPricesSum();
  console.log("Cart Item Prices Sum: ", cartItemPricesSum);
  //check if overview total price is same as sum of item prices
  await expect(checkoutPage.overviewItemTotal).toHaveText(`Item total: $${cartItemPricesSum.total.toFixed(2)}`);
  
  // read tax value
  const taxValue = await page.locator('.summary_tax_label').textContent();
  if (!taxValue) {
    throw new Error("Tax value is null or undefined");
  }
  const taxvaluefloat = parseFloat(taxValue.replace('Tax: $', ''));
  console.log("Tax Value: ", taxvaluefloat);

  // calculate total price by adding tax to the item prices sum
  const totalPrice = cartItemPricesSum.total + taxvaluefloat;
  console.log("Total Price (including tax): ", totalPrice);

  // check if overview total price is same as calculated total price
  await expect(checkoutPage.overviewTotalPrice).toHaveText(`Total: $${totalPrice.toFixed(2)}`);
});


test('verify checkout complete page', async ({ }) => {
//click on finish button
  await page.locator("#finish").click();
  //verify checkout complete page
  await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
  await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
  await expect(page.locator(".complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
});


test('verify Back Home button', async ({ }) => {
  //click on Back Home button
  await page.locator("#back-to-products").click();
  //verify Back Home button
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator(".title")).toHaveText("Products");
});



test.afterAll(async () => {
  await page.close();
});



