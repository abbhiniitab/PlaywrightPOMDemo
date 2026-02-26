import {test, expect} from '@playwright/test'
import { PageManager } from "awwg/PageManager";
import { beforeEach } from 'node:test';

test.beforeEach(async ({ page }) => {
    await page.goto('')
})


// test.describe('Faconnable My Account Tests', () => {

    // test('Navigate to Login page', async ({ page }) => {

    //     const pm = new PageManager(page)
    //     //  await pm.navigateTo().acceptCookiesIfVisible()
    //     // //  await pm.onHomePage().navigateToLoginPage()
         
    //      })

    test('Verify User is successfully logged in', {tag: ['@PlaywrightWithJenkins']}, async ({ page }) => {

        const pm = new PageManager(page)
        await pm.navigateTo().acceptCookiesIfVisible()
        // await pm.onHomePage().navigateToLoginPage()
        await pm.navigateTo().verifyMyAccountIcon()
        await pm.onMyAccountPage().verifyLoginFunctionality('abhinita.barve@awwg.com', 'Abhi@1234567')
        await expect(page.locator('.chakra-text').filter({ hasText: 'Welcome back, Abhinita Barve1' })).toBeVisible()
    })  

        
    test('Verify User is successfully logged out', {tag: ['@PlaywrightWithJenkins']}, async ({ page }) => {

        const pm = new PageManager(page)
        await pm.navigateTo().acceptCookiesIfVisible()
        await pm.navigateTo().verifyMyAccountIcon()
        await pm.onMyAccountPage().verifyLoginFunctionality('abhinita.barve@awwg.com', 'Abhi@1234567')
        await expect(page.locator('.chakra-text').filter({ hasText: 'Welcome back, Abhinita Barve1' })).toBeVisible()
        await pm.onMyAccountPage().verifyLogoutFunctionality()
        // expect(page).toHaveURL('https://pwa-dev-cc.faconnable.com/uk/en_gb/auth/login')
        expect(page).toHaveURL('https://pwa-dev-cc.faconnable.com/uk/en_gb/login') 

    })
// })   