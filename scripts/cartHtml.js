import { renderOrderList } from "./checkout/orderList.js";
import {renderCheckoutSummary} from "./checkout/checkoutSummary.js"
import { renderCartHeader } from "./Header/cartHeader.js";
import { loadProductsfetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
    loadProductsfetch(),
    new Promise( (resolve) =>{
        loadCart(() => {
            resolve();
        })
    })
]).then((values) => {
    console.log(values);
    renderCartHeader();
    renderOrderList();
    renderCheckoutSummary();
});

