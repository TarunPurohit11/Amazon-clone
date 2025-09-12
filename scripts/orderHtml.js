import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { dateConverter } from "./utils/date.js";
import { getProduct, loadProductsfetch } from "../data/products.js";
import { cart } from "../data/cart.js";
console.log(orders);
load();
async function load(){
    await loadProductsfetch();
    let html =``;   
        orders.forEach(order => {
        html += `
        <div class="order">
            <div class = "order-details">
                
                    <div class = "order-details-left-section">
                        <div class="order-placed-date-container">
                            <div class = "order-placed-text">Order Placed:</div>
                            <div class = "order-placed-date">${dateConverter(order.orderTime)}</div>
                        </div>
                        <div class="order-total">
                            <div class ="total-text">Total: </div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class = "order-details-right-section">
                        <div class="order-id-text">Order Id:</div>
                        <div class="order-id">${order.id}</div>
                    </div>
                    
            </div>
            <div class = "order-products-list">
          
            `;
        order.products.forEach((orderProduct) => {
            const product = getProduct(orderProduct.productId);
            console.log(orderProduct.productId);
            console.log(product);
            console.log(typeof(orderProduct.estimatedDeliveryTime));
            html +=  `
                
                    <div class = 'product-image-container'>
                        <img class="product-image" src="${product.image}">
                    </div>
                    <div class="product-details">
                        <div class="product-name">${product.name}</div>
                        <div class="arriving-date">
                            Arriving date: ${dateConverter(orderProduct.estimatedDeliveryTime)}
                        </div>
                        <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
                        <button class="but-it-again-class">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <div>Buy it again</div>
                        </button>
                    </div>
                    <div>
                        <button class = "track-package-button">
                            Track package
                        </button>
                    </div>
                
        `;
        });
        html += `
                </div>
            </div>  `;
            
        });
        document.querySelector('.js-order-grid').innerHTML = html;
}

document.querySelector('.js-cart-count').innerHTML = cart.updateCartCount();
