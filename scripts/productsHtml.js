import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';

let finalHtml = ``;
products.forEach(product => {
    console.log(product.id);
    const html = `<div class = "products-container"><div class = "image-container">
                        <img class = "product-image" src = ${product.image}>
                    </div>
                    <div class = "product-name limit-to-2-lines">
                       ${product.name}
                    </div>
                    <div class = "reviews">
                        <img class = "reviews-image"src = "images/ratings/rating-${(product.rating.stars)*10}.png">
                        <div class="review-ratings-count">${product.rating.count}</div>
                    </div>
                    <div class="price">$${(product.priceCents/100).toFixed(2)}</div>
                    <div class = "quantity">
                        <select class = "drop-down">
                            <option value = "1" selected>1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                            <option value = "4">4</option>
                            <option value = "5">5</option>
                            <option value = "6">6</option>
                            <option value = "7">7</option>
                            <option value = "8">8</option>
                            <option value = "9">9</option>
                            <option value = "10">10</option>
                        </select>
                    </div>
                    <div class = "added hidden">
                        <img class="ok-icon" src = "images/icons/checkmark.png"> Added
                    </div >
                    <button class="add-to-cart-button" data-id=${product.id}>Add to Card</button></div>`

    finalHtml += html;
});

document.querySelector('.products-grid-container').innerHTML = finalHtml;

const addButtons = document.querySelectorAll('.add-to-cart-button');


updateCartCount();
addButtons.forEach((btn,index) => {
    btn.addEventListener('click',()=>{
        const prodcutContainer = btn.closest('.products-container');

        const productQuantity = parseInt(prodcutContainer.querySelector('.drop-down').value);

        const added = prodcutContainer.querySelector('.added');

        added.classList.add("visible");
        const productId = (btn.dataset.id);
        console.log(productId);
        console.log(productQuantity);
        addToCart(productId,productQuantity);
        
        setTimeout(()=>{
            added.classList.remove("visible");
        },2000);
        updateCartCount();
    });
});


function updateCartCount(){
    let cartCount = cart.reduce( (sum,item) => sum + item.quantity, 0 );
    document.querySelector('.cart-count').innerHTML = cartCount;
} 