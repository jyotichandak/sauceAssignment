import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';


let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let addedItems: string[] = [];


//test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  checkoutPage = new CheckoutPage(page);
  //login to the application
 // await loginPage.validateLoginForStdUser();
});


test('verify login page visual', async () => {
  //create object of loginPage
  await page.goto('https://www.saucedemo.com/');

  await expect.soft(page).toHaveScreenshot('loginPage.png');
});


test('verify inventory page visual', async () => {
  //create object of loginPage
  await loginPage.validateLoginForStdUser();
  await page.waitForSelector('.inventory_item_img', { state: 'attached' });
  //await page.waitForTimeout(3000);

  await expect.soft(page).toHaveScreenshot('inventoryPage.png');
});

test('verify your-cart page visual', async () => {
  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await page.waitForSelector('.cart_item', { state: 'attached' });
  await expect.soft(page).toHaveScreenshot('yourCartPage.png');
});

test('verify your-information page visual', async () => {
  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkoutPage.checkOut.click();
  await page.waitForSelector('.checkout_info', { state: 'attached' });
  await expect.soft(page).toHaveScreenshot('yourInformationPage.png');
});

test('verify your-overview page visual', async () => {
  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkoutPage.checkOut.click();
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.continue.click();
  await page.waitForSelector('.summary_info', { state: 'attached' });

  await expect.soft(page).toHaveScreenshot('yourOverviewPage.png');
});

test('verify checkout-complete page visual', async () => {
  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkoutPage.checkOut.click();
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.continue.click();
  await page.locator("#finish").click();
  await page.waitForSelector('.complete-header', { state: 'attached' });

  await expect.soft(page).toHaveScreenshot('checkoutCompletePage.png');
});


test.afterEach(async () => {
  await page.close();
});



