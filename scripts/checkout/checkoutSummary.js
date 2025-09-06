import { cart } from "../../data/cart.js";
import {getProduct} from "../../data/products.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderCheckoutSummary(){

    let productPriceCents = 0;  
    let shippingPriceCents = 0;
    cart.cartItem.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    }); 

    const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;

    const totalCents = totalBeforeTaxCents + taxCents; 

    const html = `
        <div class="order-checkout js-order-checkout">
        <div class="order-summary-text">Order Summary</div>
        <div class="payment-summary">
            <div class="item-text js-item-text">Items(${cart.cartItem.length}):</div>
            <div class="items-cost">$${formatCurrency(productPriceCents)}</div>
        </div>
        <div class="payment-summary">
            <div class="shipping-text">Shipping & Handling:</div>
            <div class="shipping-cost">$${formatCurrency(shippingPriceCents)}</div>
        </div>
        <div class="payment-summary">
            <div class="before-tax-text">Total before tax:</div>
            <div class="before-tax-cost">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>
        <div class="payment-summary">
            <div class="after-tax-text">Estimated tax (10%):</div>
            <div class="after-tax-cost">$${formatCurrency(taxCents)}</div>
        </div>
        <div class="divider"></div>
        <div class="payment-summary order-summary-total">
            <div class="order-total-text">Order total:</div>
            <div class="order-total-cost">$${formatCurrency(totalCents)}</div>
        </div>
        <button class="order-button">Place your order</button>
        </div> `;

    document.querySelector('.checkout-summary-container').innerHTML = html;


        
}