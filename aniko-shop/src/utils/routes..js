import { HOME, NEWESTS, SALES, ALLGOODS, SEARCH } from "./const";

import Home from "../pages/Home";
import Newest from "../pages/Newest";
import Sales from "../pages/Sales";
import AllGoods from "../pages/AllGoods";
import GoodsByCategory from "../pages/GoodsByCategory";
import SearchedGoods from "../pages/SearchedGoods";

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
        path: SEARCH,
        element: SearchedGoods
    }
]