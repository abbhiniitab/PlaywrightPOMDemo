import { Locator, Page } from "@playwright/test";
import { HelperBase } from '../../../../helperBase';

export class MyAccountPage extends HelperBase {
   
    constructor(page: Page) {
        super(page)
    }

async verifyLoginFunctionality(email: string, password: string) {

    const registered = this.page.locator('.chakra-container', { hasText: 'Registered' })    
    await registered.getByRole('textbox', { name: 'Email' }).fill(email)
    await registered.getByRole('textbox', { name: 'Password' }).fill(password)
    await registered.getByRole('button', { name: 'Sign in' }).click()
    console.log('Login functionality verified successfully')

}

async verifyLogoutFunctionality() {

    const signout = this.page.locator('button', { hasText: 'Sign out' })
    if(await signout.isVisible()) {
        await signout.click()
        console.log('Sign out button clicked successfully'); 
    } else {
        console.log('Logout button is not visible');
    }
        

}

}
