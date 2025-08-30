
export let cart = JSON.parse(localStorage.getItem('cart'));


if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    shipping:0,
    deliveryOptionId : '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    shipping:0,
    deliveryOptionId : '2'
  }];
}

function getCartItem(productId){
  return cart.find(c => c.productId === productId);
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,productQuantity){
    const cartItem= getCartItem(productId);
    console.log(cartItem);
    if(cartItem){
        cartItem.quantity += productQuantity;
    }
    else{
        cart.push({
            productId : productId,
            quantity : productQuantity,
            shipping : 0,
            deliveryOptionId: '1'
        })
    }
    saveToStorage();

}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach(cartItem => {
    if(productId !== cartItem.productId)
      newCart.push(cartItem);
  });
  cart = newCart;
  saveToStorage();
}

export function updateCartCount(){
    const cartCount = cart.reduce( (sum,item) => sum + item.quantity, 0 );
    return cartCount;
} 

export function setCartItemQuantity(productId,quantityValue){
  const cartItem = getCartItem(productId);
  cartItem.quantity = quantityValue;
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  const cartItem = getCartItem(productId);

  cartItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}