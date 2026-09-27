const { expect } = require("@playwright/test");

class ApiUtils {

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        );

        expect(loginResponse.status()).toBe(200);

        const loginResponseJson = await loginResponse.json();

        return loginResponseJson.token;
    }

    async createOrder(orderPayLoad) {

        const response = {};

        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    authorization: response.token,
                    "Content-Type": "application/json"
                }
            }
        );

        expect(orderResponse.status()).toBe(201);

        const orderResponseJson = await orderResponse.json();

        response.orderId = orderResponseJson.orders[0];

        return response;
    }
}

module.exports = { ApiUtils };