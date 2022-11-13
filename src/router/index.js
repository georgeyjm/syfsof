import { createWebHistory, createRouter } from "vue-router"
import SellerAddBatchPage from "@/pages/SellerAddBatchPage/index.vue"
import CustomerShopPage from "@/pages/CustomerShopPage/index.vue"
import CustomerProductPage from "@/pages/CustomerProductPage/index.vue"
import CustomerFridgePage from "@/pages/CustomerFridgePage/index.vue"
import CustomerScanPage from "@/pages/CustomerScanPage/index.vue"
import CustomerTreesPage from "@/pages/CustomerTreesPage/index.vue"

const routes = [
    {
        path: "/",
        name: "SellerAddBatchPage",
        component: SellerAddBatchPage,
    },
    {
        path: "/shop",
        name: "CustomerShopPage",
        component: CustomerShopPage,
    },
    {
        path: "/product",
        name: "CustomerProductPage",
        component: CustomerProductPage,
    },
    {
        path: "/fridge",
        name: "CustomerFridgePage",
        component: CustomerFridgePage,
    },
    {
        path: "/scan",
        name: "CustomerScanPage",
        component: CustomerScanPage,
    },
    {
        path: "/trees",
        name: "CustomerTreesPage",
        component: CustomerTreesPage,
    },
]  

const router = createRouter({
    history: createWebHistory(), routes
})
  
export default router
