import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';


test('verify inventory items are sorted from Z to A', async ({ page }) => { 

    //create object of loginPage

    const loginPage = new LoginPage(page);

    //create object of inventoryPage
    const inventoryPage = new InventoryPage(page);

    //navigate to the application
    await page.goto('https://www.saucedemo.com/');

    //login to the application
    await loginPage.validateLoginForStdUser();

    //sort items from Z to A
    await inventoryPage.productSort.selectOption({ label: 'Name (Z to A)' });

    //verify items are sorted from Z to A
    await inventoryPage.verifySortZToAForItemLabels();
  
});



