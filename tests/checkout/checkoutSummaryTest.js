import { cart } from "../../data/cart.js";
import { renderCheckoutSummary } from "../../scripts/checkout/checkoutSummary.js";
import { loadProductsfetch } from "../../data/products.js";


describe('test suite: renderCheckoutSummary', () => {
    beforeAll((done) => {
        loadProductsfetch().then(() => {
            done();
        });
    });

    it('displays the checkout summary', () => {


        document.querySelector('.js-test-container').innerHTML = `
            <div class = "checkout-summary-container"></div>
        `

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryOptionId : '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
                deliveryOptionId : '2'
            }]);
        });
        cart.loadFromStorage();

        renderCheckoutSummary();

        expect(
            document.querySelectorAll('.js-order-checkout').length
        ).toEqual(1);

        expect (
            document.querySelector('.js-item-text').innerHTML
        ).toContain('Items(2)');

        document.querySelector('.js-test-container').innerHTML = ``;
    });
    
});