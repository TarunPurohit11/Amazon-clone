class Cart{
  cartItem;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey));


    if(!this.cartItem){
      this.cartItem = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId : '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionId : '2'
      }];
    }
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItem));
  }

  getCartItem(productId){
    return this.cartItem.find(c => c.productId === productId);
  }

  addToCart(productId,productQuantity){
    const cartItem= this.getCartItem(productId);
    if(cartItem){
        cartItem.quantity += productQuantity;
    }
    else{
        this.cartItem.push({
            productId : productId,
            quantity : productQuantity,
            deliveryOptionId: '1'
        })
    }
    this.saveToStorage();

  }

  removeFromCart(productId){
    const newCart = [];

    this.cartItem.forEach(cartItem => {
      if(productId !== cartItem.productId)
        newCart.push(cartItem);
    });
    this.cartItem = newCart;
    this.saveToStorage();
  }

  updateCartCount(){
    const cartCount = this.cartItem.reduce( (sum,item) => sum + item.quantity, 0 );
    return cartCount;
  } 

  setCartItemQuantity(productId,quantityValue){
    const cartItem = this.getCartItem(productId);
    cartItem.quantity = quantityValue;
    this.saveToStorage();
  }

  
  updateDeliveryOption(productId,deliveryOptionId){
    if(deliveryOptionId !== '1' && deliveryOptionId !== '2' && deliveryOptionId !== '3'){
      return;
    }
    const cartItem = this.getCartItem(productId);
    if(!cartItem){
      return;
    }
    cartItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

export const cart = new Cart();

export function loadCart(func){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',() => {
    console.log(xhr.response);
    func();
  })
  
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}