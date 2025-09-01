import {addToCart, cart, loadFromStorage} from '../../data/cart.js'

describe('test suite: addToCart', ()=>{
    it('add an existing product to the cart',()=>{

        spyOn(localStorage,'setItem');


        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : "a82c6bac-3067-4e68-a5ba-d827ac0be010",
                quantity : 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('a82c6bac-3067-4e68-a5ba-d827ac0be010',1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('a82c6bac-3067-4e68-a5ba-d827ac0be010');
        expect(cart[0].quantity).toEqual(2);
    });
    it('add a new product to the cart', ()=>{

        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('a82c6bac-3067-4e68-a5ba-d827ac0be010',3);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart[0].productId).toEqual('a82c6bac-3067-4e68-a5ba-d827ac0be010');
        expect(cart[0].quantity).toEqual(3);
    });
});