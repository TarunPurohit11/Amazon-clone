import{cart, removeFromCart, updateCartCount, setCartItemQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import{deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderCheckoutSummary } from './checkoutSummary.js';
import { renderCartHeader } from '../Header/cartHeader.js';
import { deliveryDateString } from '../utils/date.js';
export function renderOrderList(){
    let finalCartHtml = ``;


    cart.forEach(cartItem => {
      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId);
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const dateString = deliveryDateString(deliveryOption.deliveryDays);

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

        const dateString = deliveryDateString(deliveryOption.deliveryDays);
        console.log("delivery option: "+dateString);
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
                renderCheckoutSummary();
              });
          });

    document.querySelectorAll('.js-delete-quantity-link')
            .forEach(link => {
                link.addEventListener('click',()=>{
                  const productId = link.dataset.productId;
                  removeFromCart(productId);
                  const orderContainer = document.querySelector(`.js-order-${productId}`);
                  orderContainer.remove();
                  renderCheckoutSummary();
                  renderCartHeader();
                });
            });

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
        renderCartHeader();
        renderCheckoutSummary();
        document.querySelector('.js-middle-section').innerHTML = `Checkout(${updateCartCount()} items)`;
        document.querySelector(`.js-cart-quantity-${productId}`).innerHTML= quantityValue;
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('invisible');
        document.querySelector(`.js-quantity-bar-${productId}`).classList.add('invisible');
        document.querySelector(`.js-update-quantity-link-${productId}`).classList.remove('invisible');
        document.querySelector(`.js-cart-quantity-${productId}`).classList.remove('invisible');
      });
    });

}
