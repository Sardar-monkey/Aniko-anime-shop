import { useEffect, useState } from "react";
import { a } from "../axios-api/axiosinstamce";
import GoodsCard from "./GoodsCard";

function GoodsList ({category}) {
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

    const FilteredByCategory = category ? goods.filter((good) => good.category === category) : goods;

    return( 
        <section className="goods">
            <h2 class="title">{category}</h2>
            <div class="container">
                {FilteredByCategory.map((good) => (
                    <GoodsCard key={good.id} good={good} />
                ))}
            </div>
        </section>
    );
}

export default GoodsList;