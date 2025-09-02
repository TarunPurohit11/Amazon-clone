import { cart } from "../../data/cart.js";


export function renderCartHeader(){
    document.querySelector('.cart-header').innerHTML = `<div class="left-section">
                    <a href = "home-page.html" class="logo-section">
                        <img class="amazon-logo" src="images/amazon-logo.png">
                    </a>
                </div>
                <div class = "middle-section js-middle-section">
                </div>
                <div class="right-section">
                    <div class="lock-icon-section">
                        <img class="lock-icon" src="images/icons/checkout-lock-icon.png">
                    </div>
                </div>`;
document.querySelector('.js-middle-section').innerHTML = `Checkout(${cart.updateCartCount()} items)`
}