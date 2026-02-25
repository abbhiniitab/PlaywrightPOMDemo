import { Page, expect } from "@playwright/test";
import {NavigationPage} from './pages/brands/Faconnable/Homepage/Header/Navigation'
import { MyAccountPage } from "awwg/pages/brands/Faconnable/My Account/myaccount";

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly myAccountPage: MyAccountPage

    constructor(page: Page){

        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.myAccountPage = new MyAccountPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

     onMyAccountPage(){
        return this.myAccountPage
     }
}