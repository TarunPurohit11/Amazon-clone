import { renderOrderList } from "./checkout/orderList.js";
import {renderCheckoutSummary} from "./checkout/checkoutSummary.js"
import { renderCartHeader } from "./Header/cartHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
    new Promise((resolve)=>{
        loadProducts(() => {
            resolve('value1');
        })
    }),
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

