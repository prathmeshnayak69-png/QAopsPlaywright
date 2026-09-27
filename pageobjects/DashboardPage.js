class DashboardPage {
    constructor(page) {
        this.page = page
        this.products = page.locator('.card-body');
        this.productText = page.locator('.card-body b');
        


    }

}