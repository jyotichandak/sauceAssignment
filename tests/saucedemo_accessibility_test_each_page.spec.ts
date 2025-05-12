import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

import { checkAccessibilityViolations } from '../utils/accessibilityHelper';
import { after, afterEach } from 'node:test';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let page: Page;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  checkoutPage = new CheckoutPage(page);
});



test('accessibility check for login page', async ({ page }, testInfo) => {

 // await page.goto('https://www.saucedemo.com/');
  await checkAccessibilityViolations(page, loginPage.baseURL, 
            () => new AxeBuilder({ page: page }),['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

});

test('accessibility check for inventory page   @urllaunch1', async ({ page }, testInfo) => {

   await loginPage.validateLoginForStdUser();
   await checkAccessibilityViolations(page, inventoryPage.inventoryURL, 
             () => new AxeBuilder({ page: page }),['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
 
 });

 test('accessibility check for cart page', async ({ page }, testInfo) => {

  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkAccessibilityViolations(page, inventoryPage.cartURL, 
            () => new AxeBuilder({ page: page }),['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

});

test('accessibility check for checkout-step-1', async ({ page }, testInfo) => {

  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkoutPage.checkOut.click();
  await checkAccessibilityViolations(page, checkoutPage.checkoutStep1URL, 
            () => new AxeBuilder({ page: page }),['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

});

test('accessibility check for checkout-step-2', async ({ page }, testInfo) => {

  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkoutPage.checkOut.click();
  await checkoutPage.fillCheckoutInfo('John','Doe','12345');
  await checkoutPage.continue.click();
  await checkAccessibilityViolations(page, checkoutPage.checkoutStep2URL, 
            () => new AxeBuilder({ page: page }),['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

});

test('accessibility check for checkout-complete', async ({ page }, testInfo) => {

  await loginPage.validateLoginForStdUser();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.cartLink.click();
  await checkoutPage.checkOut.click();
  await checkoutPage.fillCheckoutInfo('John','Doe','12345');
  await checkoutPage.continue.click();
  await checkoutPage.finish.click();
  await checkAccessibilityViolations(page, checkoutPage.checkoutCompleteURL, 
            () => new AxeBuilder({ page: page }),['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

});

afterEach(async ({ page }) => {
  await page.close();

});