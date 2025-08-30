
export let cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    priceCents: 1090,
    quantity:1,
    shipping:0
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    priceCents: 2095,
    quantity:1,
    shipping:0
  }];

export function addToCart(productId,productQuantity){
    const cartItem= cart.find(c => c.id === productId);

    if(cartItem){
        cartItem.quantity += productQuantity;
    }
    else{
        cart.push({
            id : productId,
            quantity : productQuantity,
            shipping : 0
        })
    }
    console.log(cart)

}