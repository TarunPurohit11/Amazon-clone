import { cart } from '../../data/cart.js';
import { renderOrderList } from '../../scripts/checkout/orderList.js';
import {  loadProductsfetch } from '../../data/products.js';

describe('test Suite: renderOrderList', () => {
    
    const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeAll((done) => {
        loadProductsfetch().then(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage,'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class = "order-list"></div>
            <div class = "checkout-summary-container"></div>
            <div class = "cart-header"></div>
        `;

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity:1,
                deliveryOptionId : '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:2,
                deliveryOptionId : '1'
            }])
        });
        cart.loadFromStorage();
        renderOrderList();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('display the list of items/orders in cart', () => {
        
        expect(
            document.querySelectorAll('.js-order').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-cart-quantity-${productId1}`).innerText
        )
        .toEqual('1');

        expect(
            document.querySelector(`.js-cart-quantity-${productId2}`).innerText
        )
        .toEqual('2');
    document.querySelector('.js-test-container').innerHTML = ``;


    });

    it('check delete link functionality', () => { 

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-order').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-order-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-order-${productId2}`)
        ).not.toEqual(null);

        expect(cart.cartItem.length).toEqual(1);
        expect(cart.cartItem[0].productId).toEqual(productId2);
        document.querySelector('.js-test-container').innerHTML = ``;

       
    });

    it('updating delivery options', () => {

        document.querySelector(`.js-delivery-option-input-${productId1}-${3}`).click();
        expect(
            document.querySelector(`.js-delivery-option-input-${productId1}-${3}`).checked
        ).toEqual(true);

        expect(cart.cartItem[0].deliveryOptionId).toEqual('3');
        

    });
});