import { useEffect, useState } from "react";
import { a } from "../axios-api/axiosinstamce";
import GoodsCard from "./GoodsCard";

function GoodsSale () {
    const [goods, SetGoods] = useState([]);

    useEffect(() => {
        async function fetchGoods () {
            try {
                const res = await a.get('/Goods');
                SetGoods(res.data);
            } catch (error) {
                console.error("Error : ", error)
            }
        }

        fetchGoods();
        
    }, []);

    const FilteredByDiscount = goods.filter((good) => good.discount > 0)

    return( 
        <div class="container">
            {FilteredByDiscount.map((good) => (
                <GoodsCard key={good.id} good={good} />
            ))}
        </div>
    );
}

export default GoodsSale;