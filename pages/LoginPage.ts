import { expect, type Locator, type Page } from '@playwright/test';



export class LoginPage {

    //locators
    page: Page;
    uname: Locator;
    pwd: Locator;
    login: Locator;
    baseURL: string;
  

    errorLabel = "Epic sadface: Sorry, this user has been locked out."

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.baseURL = 'https://www.saucedemo.com/';
         // this.uname = page.locator ('#user-name');
        this.uname = page.getByPlaceholder('Username');
        // this.pwd = page.locator('#password');
        this.pwd = page.getByPlaceholder('Password');
        this.login = page.getByRole('button', { name: 'Login' });
    }


    async validateLoginForStdUser() {
        //navigate to the application
        await this.page.goto('https://www.saucedemo.com/');
        await this.uname.fill('standard_user');
        await this.pwd.fill('secret_sauce')
        await this.login.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }

    async validateLoginForInvalidUser(uname, pwd) {
        await this.uname.fill('standard_user');
        await this.pwd.fill('secret_sauce')
        await this.login.click();
        await expect(this.page.locator('h3')).toContainText(this.errorLabel);

    }



}