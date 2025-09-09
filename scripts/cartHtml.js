import { renderOrderList } from "./checkout/orderList.js";
import {renderCheckoutSummary} from "./checkout/checkoutSummary.js"
import { renderCartHeader } from "./Header/cartHeader.js";
import { loadProductsfetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


async function loadPage(){
    try{
        await loadProductsfetch();
    
        await new Promise( (resolve) =>{
            loadCart(() => {
                resolve();
            });
        });
        
    }catch(error){
        console.log('Unexpected error async');
    }

    renderCartHeader();
    renderOrderList();
    renderCheckoutSummary();
}

loadPage();


// Promise.all([
//     loadProductsfetch(),
//     new Promise( (resolve) =>{
//         loadCart(() => {
//             resolve();
//         })
//     })
// ]).then((values) => {
//     console.log(values);
//     
// });

