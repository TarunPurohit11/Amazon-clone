let finalHtml = ``;
console.log(products);
for(i = 0; i < products.length; i++){
    product = products[i];
    const html = `<div class = "products-container"><div class = "image-container">
                        <img class = "product-image" src = ${product.image}>
                    </div>
                    <div class = "product-name limit-to-2-lines">
                       ${product.name}
                    </div>
                    <div class = "reviews">
                        <img class = "reviews-image"src = "images/reviews/rating-${product.review}.png">
                        <div class="review-ratings-count">${product.reviewCount}</div>
                    </div>
                    <div class="price">$${(product.price/100).toFixed(2)}</div>
                    <div class = "quantity">
                        <select class = "drop-down">
                            <option value = "1" selected>1</option>
                            <option value = "1">2</option>
                            <option value = "1">3</option>
                            <option value = "1">4</option>
                            <option value = "1">5</option>
                            <option value = "1">6</option>
                            <option value = "1">7</option>
                            <option value = "1">8</option>
                            <option value = "1">9</option>
                            <option value = "1">10</option>
                        </select>
                    </div>
                    <div class = "added hidden">
                        <img class="ok-icon" src = "images/reviews/checkmark.png"> Added
                    </div >
                    <button class="add-to-cart-button">Add to Card</button></div>`

    finalHtml += html;
}

document.querySelector('.products-grid-container').innerHTML = finalHtml;
const added = document.querySelector('.added');    
document.querySelector('.add-to-cart-button').addEventListener('click',()=>{
    cartCount++;
    added.classList.add("visible");
    setTimeout(()=>{
        added.classList.remove("visible");
    },2000);
});
document.querySelector('cart-count').innerHTML = `${cartCount}`;