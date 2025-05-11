import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';


test('verify inventory items are sorted from Z to A @sortza', async ({ page }) => {

  //create object of loginPage
  const loginPage = new LoginPage(page);

  //create object of inventoryPage
 const inventoryPage = new InventoryPage(page);

  //login to the application
  await loginPage.validateLoginForStdUser();

  //sort items from Z to A
  await inventoryPage.productSort.selectOption({ label: 'Name (Z to A)' });

  //verify items are sorted from Z to A
  await inventoryPage.verifySortZToAForItemLabels();

});

test('verify inventory items are sorted by price from high to low', async ({ page }) => {

  //create object of loginPage

  const loginPage = new LoginPage(page);

  //create object of inventoryPage
  const inventoryPage = new InventoryPage(page);

  //login to the application
  await loginPage.validateLoginForStdUser();

  //sort items from Z to A
  await inventoryPage.productSort.selectOption({ label: 'Price (high to low)' });

  //verify items are sorted from Z to A
  await inventoryPage.verifySortHighToLowForItemPrices();

});

//write test to add item to cart
test('verify the cart badge count', async ({ page }) => {
  //create object of loginPage
  const loginPage = new LoginPage(page);

  //create object of inventoryPage
  const inventoryPage = new InventoryPage(page);

  //login to the application
  await loginPage.validateLoginForStdUser();

  //add 3 items to cart and save the itemtest to an array
  //define an array for string values  
  const addedItems: string[] = [];

  for (let i = 0; i < 3; i++) {
    //add item to cart        
    const addedItemText = await inventoryPage.addItemToCart(i);
    addedItems.push(addedItemText);
  }

  console.log("Added Items: ", addedItems);

  //verify item is added to cart
  await expect(inventoryPage.shoppingCartBadge).toHaveText('3');

});

//write test to check if the cart items are same as the added items
test('verify the cart items are same as the added items @checkoutpage', async ({ page }) => {
  //create object of loginPage
  const loginPage = new LoginPage(page);

  //create object of inventoryPage
  const inventoryPage = new InventoryPage(page);

  //create object of checkoutPage
  const checkoutPage = new CheckoutPage(page);


  //login to the application
  await loginPage.validateLoginForStdUser();


  //define an array for string values  
  const addedItems: string[] = [];

  for (let i = 0; i < 3; i++) {
    //add item to cart        
    const addedItemText = await inventoryPage.addItemToCart(i);
    console.log("Added Items: ", addedItemText);
    addedItems.push(addedItemText);
  }

  console.log("Added Items: ", addedItems);

  //click on cart icon
  await inventoryPage.cartLink.click();

  //get all cart items names on the checkout page
  const cartItemNames = await checkoutPage.getAllCartItemNames();

  console.log("Cart Item Names: ", cartItemNames);

  //compare the arrays
  expect.soft(cartItemNames).toEqual(addedItems);

});

//write test to check if removed item is not in the cart
test('verify the removed item is not in the cart', async ({ page }) => {
  //create object of loginPage
  const loginPage = new LoginPage(page);

  //create object of inventoryPage
  const inventoryPage = new InventoryPage(page);

  //create object of checkoutPage
  const checkoutPage = new CheckoutPage(page);


  //login to the application
  await loginPage.validateLoginForStdUser();

  //click on cart icon
  await inventoryPage.cartLink.click();

  //remove item from cart
  await inventoryPage.removeFromCart.nth(0).click();

  //get all cart items names on the checkout page
  const cartItemNames = await checkoutPage.getAllCartItemNames();

  console.log("Cart Item Names: ", cartItemNames);

  //compare the arrays
  expect(cartItemNames).not.toContain(addedItems[0]);

});



