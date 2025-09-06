import { cart} from '../../data/cart.js'

describe('test suite: addToCart', ()=>{


    const productId = "a82c6bac-3067-4e68-a5ba-d827ac0be010";


    it('add an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');


        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : "a82c6bac-3067-4e68-a5ba-d827ac0be010",
                quantity : 1,
                deliveryOptionId: '1'
            }]);
        });
        cart.loadFromStorage();

        cart.addToCart(productId,1);
        expect(cart.cartItem.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItem[0].productId).toEqual(productId);
        expect(cart.cartItem[0].quantity).toEqual(2);
    });
    it('add a new product to the cart', ()=>{

        spyOn(localStorage,'setItem');


        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromStorage();
        
        cart.addToCart(productId,3);
        expect(cart.cartItem.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart.cartItem[0].productId).toEqual(productId);
        expect(cart.cartItem[0].quantity).toEqual(3);
    });

    it('update delivery option',() => {

        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : "a82c6bac-3067-4e68-a5ba-d827ac0be010",
                quantity : 1,
                deliveryOptionId: '1'
            }])
        });
        cart.loadFromStorage();

        const deliveryOptionId = '2';
        cart.updateDeliveryOption(productId,deliveryOptionId);
        expect(cart.cartItem[0].deliveryOptionId).toEqual('2');
    });

    it('if product id is not present in cart',() => {

        spyOn(localStorage,'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : "a82c6bac-3067-4e68-a5ba-d827ac0be010",
                quantity : 1,
                deliveryOptionId: '1'
            }]);
        });
        cart.loadFromStorage();
        expect(cart.updateDeliveryOption('1','3')).toBeUndefined();

        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart',[]);

        expect(cart.updateDeliveryOption(productId,'4')).toBeUndefined();
    })
});