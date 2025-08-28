let finalCartHtml = ``;
for (let i = 0; i < cart.length; i++) {
  const html = `
    <div class="order">
      <div class="date">Date:</div>
      <div class="order-details-grid">
        <img class="item-image" src="${cart[i].image}">
        <div class="cart-item-details">
          <div class="product-name">${cart[i].productName}</div>
          <div class="total-product-cost">$${(cart[i].price / 100).toFixed(2)}</div>
          <div class="order-options">
            <div>Quantity</div>
            <select class="quantity-selection">
              ${Array.from({ length: 10 }, (_, idx) => 
                `<option value="${idx + 1}" ${cart[i].quantity === idx + 1 ? 'selected' : ''}>${idx + 1}</option>`
              ).join('')}
            </select>
            <div><a href="">Save</a></div>
            <div><a href="">Delete</a></div>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-option-text">Choose a delivery option:</div> 
          <form data-id="${cart[i].id}">
            <label class="selection">
              <input type="radio" class = "tick-box " name="select-options-${cart[i].id}" value="0" ${cart[i].shipping === 0 ? 'checked' : ''}>
              <div class="delivery-option">
                <div class="delivery-dates">Tuesday, September 2</div>
                <div class="delivery-charges">$0 - Free Shipping</div>
              </div>
            </label>
            <label class="selection">
              <input type="radio" class = "tick-box " name="select-options-${cart[i].id}" value="499" ${cart[i].shipping === 499 ? 'checked' : ''}>
              <div class="delivery-option">
                <div class="delivery-dates">Wednesday, September 3</div>
                <div class="delivery-charges">$4.99 - Shipping</div>
              </div>
            </label>
            <label class="selection">
              <input type="radio" class = "tick-box " name="select-options-${cart[i].id}" value="999" ${cart[i].shipping === 999 ? 'checked' : ''}>
              <div class="delivery-option">
                <div class="delivery-dates">Friday, August 29</div>
                <div class="delivery-charges">$9.99 - Shipping</div>
              </div>
            </label>
          </form>                          
        </div>
      </div>
    </div>`;
  finalCartHtml += html;
}

// 🔹 Put HTML first
document.querySelector('.order-list').innerHTML = finalCartHtml;

// 🔹 Then add event listeners
document.querySelectorAll("form[data-id]").forEach(form => {
  const productId = parseInt(form.dataset.id);
  
  form.querySelectorAll("input[type='radio']").forEach(radio => {
    radio.addEventListener("change", () => {
      const selectedValue = parseInt(radio.value);
      const item = cart.find(p => p.id === productId);
      if (item) {
        item.shipping = selectedValue;
      }
      updateSummary();
    });
  });
});

// 🔹 Summary function
function updateSummary() {
  let totalItemCost = 0;
  let totalShipping = 0;
  cart.forEach(item => {
    totalItemCost += item.price * item.quantity;
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
