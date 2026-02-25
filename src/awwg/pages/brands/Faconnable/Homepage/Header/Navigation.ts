import { Locator, Page } from "@playwright/test";
import { HelperBase } from '../../../../../helperBase';

export class NavigationPage extends HelperBase {
    verifyLogoutFunctionality() {
        throw new Error('Method not implemented.');
    }

    readonly sitelogo: Locator
    readonly searchIcon: Locator
    readonly clothingL1Category: Locator
    readonly shirtsL1Category: Locator
    readonly footwearL1Category: Locator
    readonly myaccountIcon: Locator
    readonly signout: Locator
    readonly minicartIcon: Locator
    readonly cookiesAcceptButton: Locator

    constructor(page: Page) {
        super(page)
        this.sitelogo = page.locator(`.chakra-icon`)
        this.searchIcon = page.getByRole(`button`, { name: `Search` })
        this.clothingL1Category = page.getByRole(`link`, { name: `Clothing` })
        this.shirtsL1Category = page.getByRole(`link`, { name: `Shirts ` })
        this.footwearL1Category = page.getByRole(`link`, { name: `Footwear` })
        this.myaccountIcon = page.getByRole(`button`, { name: `User: Sign In / Register` })
        this.signout = page.getByRole(`button`, { name: `Sign out` })
        this.minicartIcon = page.getByRole(`button`, { name: `In your bag (0)` })
        this.cookiesAcceptButton = page.getByRole(`button`, { name: 'Allow all' })
    }

    async acceptCookiesIfVisible() {
        if (await this.cookiesAcceptButton.isVisible()) {   
            await this.cookiesAcceptButton.click()
            console.log('Cookie popup accepted');       
        } else {
            console.log('Cookie popup not visible');
        }   
    }

    async verifyFaconnableLogo() {
        await this.sitelogo.waitFor({ state: 'visible' })  
        await this.sitelogo.click()
        console.log('Faconnable logo is visible and clickable')
    }

    async verifyMyAccountIcon() {
        await this.myaccountIcon.hover()
        await this.myaccountIcon.click()    
        console.log('My Account icon is visible and clickable')
    }

    async verifySignoutButton() {
        await this.signout.isVisible()
        await this.signout.click()
    }

    // async verifyMiniCartIcon() {
    //     await this.minicartIcon.isVisible()
    //     await this.minicartIcon.click()
    //     console.log('Mini Cart icon is visible and clickable')
    // }
    
}
