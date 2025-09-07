import { renderOrderList } from "./checkout/orderList.js";
import {renderCheckoutSummary} from "./checkout/checkoutSummary.js"
import { renderCartHeader } from "./Header/cartHeader.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
    renderCartHeader();
    renderOrderList();
    renderCheckoutSummary();
})
