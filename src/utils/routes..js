import { HOME, NEWESTS, SALES, ALLGOODS, PRODUCTPAGE, CORSINA } from "./const";

import Home from "../pages/Home";
import Newest from "../pages/Newest";
import Sales from "../pages/Sales";
import AllGoods from "../pages/AllGoods";
import GoodsByCategory from "../pages/GoodsByCategory";
import ProductPage from "../pages/Product_page";
import Corsina from "../pages/Corsina";

export const routes = [
    {
        path: HOME,
        element: Home
    },
    {
        path: NEWESTS,
        element: Newest
    },
    {
        path: SALES,
        element: Sales
    },
    {
        path: ALLGOODS,
        element: AllGoods
    },
    {
        path: "/Category/:category",
        element: GoodsByCategory
    },
    {
        path: PRODUCTPAGE,
        element: ProductPage
    },
    {
        path: CORSINA,
        element: Corsina
    }        

]