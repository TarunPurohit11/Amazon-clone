import{cart, removeFromCart, updateCartCount, setCartItemQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import{deliveryOptions} from '../../data/deliveryOptions.js';
import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderOrderList(){
    let finalCartHtml = ``;


    cart.forEach(cartItem => {
      const productId = cartItem.productId;
      const matchingProduct = products.find(p => p.id === productId);
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = deliveryOptions.find(d => d.id === deliveryOptionId);

      const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

        const dateString = deliveryDate.format('dddd, MMMM D');

      finalCartHtml += `
        <div class="order js-order-${matchingProduct.id}">
          <div class="date">Delivery date: ${dateString} </div>
          <div class="order-details-grid">
            <img class="item-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="total-product-cost">$${formatCurrency(matchingProduct.priceCents)}</div>
              <div class="order-options">
                <div>Quantity: </div>
                <span class = "js-cart-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                <input class = "quantity-bar js-quantity-bar-${matchingProduct.id} invisible" type="number" value = "1">
                <div>
                  <span class = "js-update-quantity-link js-update-quantity-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>Update</span>
                  <span class = "js-save-quantity-link invisible js-save-quantity-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>Save</span>
                  </div>
                <div><span class = "js-delete-quantity-link" data-product-id="${cartItem.productId}">Delete</span></div>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-option-text">Choose a delivery option:</div> 
              ${deliveryOptionHTML(matchingProduct,cartItem)}              
            </div>
          </div>
        </div>`;
    }) 

    function deliveryOptionHTML(matchingProduct,cartItem){

      let html = ``;

      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');

        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html +=
                `<div class = "delivery-option js-delivery-option" 
                  data-product-id=${matchingProduct.id}
                  data-delivery-option-id="${deliveryOption.id}">
                  <input type = "radio" ${isChecked ? 'checked': ''} class = "delivery-option-input" name = "delivery-option-${matchingProduct.id}"/>
                  <div>
                    <div class = "delivery-option-date">
                      ${dateString}
                    </div>
                    <div class ="delivery-option-price">
                      $${priceString} - Shipping
                    </div>
                  </div>
                </div>`;
      });
      return html;  
    }

    // 🔹 Put HTML first
    document.querySelector('.order-list').innerHTML = finalCartHtml;

    // 🔹 Then add event listeners
    document.querySelectorAll('.js-delivery-option')
          .forEach(element => {
              element.addEventListener('click', ()=> {
                const {productId,deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderList();
              })
          })

    // 🔹 Summary function
    function updateSummary() {
      let totalItemCost = 0;
      let totalShipping = 0;
      cart.forEach(item => {
        totalItemCost += item.priceCents * item.quantity;
        totalShipping += item.shipping;
      });

      document.querySelector('.checkout-summary-container').innerHTML = `
        <div class="order-checkout">
          <div class="order-summary-text">Order Summary</div>
          <div class="payment-summary">
            <div class="item-text">Items(${cart.length}):</div>
            <div class="items-cost">$${(totalItemCost / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary">
            <div class="shipping-text">Shipping & Handling:</div>
            <div class="shipping-cost">$${(totalShipping / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary">
            <div class="before-tax-text">Total before tax:</div>
            <div class="before-tax-cost">$${((totalItemCost + totalShipping) / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary">
            <div class="after-tax-text">Estimated tax (10%):</div>
            <div class="after-tax-cost">$${(((totalItemCost + totalShipping) * 0.1) / 100).toFixed(2)}</div>
          </div>
          <div class="divider"></div>
          <div class="payment-summary order-summary-total">
            <div class="order-total-text">Order total:</div>
            <div class="order-total-cost">$${(((totalItemCost + totalShipping) * 1.1) / 100).toFixed(2)}</div>
          </div>
          <button class="order-button">Place your order</button>
        </div>`;
    }
    // First update call
    updateSummary();
    document.querySelectorAll('.js-delete-quantity-link')
            .forEach(link => {
                link.addEventListener('click',()=>{
                  const productId = link.dataset.productId;
                  removeFromCart(productId);
                  const orderContainer = document.querySelector(`.js-order-${productId}`);
                  orderContainer.remove();
                  document.querySelector('.js-middle-section').innerHTML = `Checkout(${updateCartCount()} items)`;
                });
            });
    document.querySelector('.js-middle-section').innerHTML = `Checkout(${updateCartCount()} items)`;

    document.querySelectorAll('.js-update-quantity-link').forEach(link =>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        document.querySelector(`.js-update-quantity-link-${productId}`).classList.add('invisible');
        document.querySelector(`.js-cart-quantity-${productId}`).classList.add('invisible');
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('invisible');
        document.querySelector(`.js-quantity-bar-${productId}`).classList.remove('invisible');
      });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach(link =>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const quantityValue = parseInt(document.querySelector(`.js-quantity-bar-${productId}`).value);
        setCartItemQuantity(productId,quantityValue);
        document.querySelector('.js-middle-section').innerHTML = `Checkout(${updateCartCount()} items)`;
        document.querySelector(`.js-cart-quantity-${productId}`).innerHTML= quantityValue;
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('invisible');
        document.querySelector(`.js-quantity-bar-${productId}`).classList.add('invisible');
        document.querySelector(`.js-update-quantity-link-${productId}`).classList.remove('invisible');
        document.querySelector(`.js-cart-quantity-${productId}`).classList.remove('invisible');
      });
    });

}
