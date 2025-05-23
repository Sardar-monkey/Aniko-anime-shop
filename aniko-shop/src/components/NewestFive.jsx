import { useEffect, useState } from "react";
import { a } from "../axios-api/axiosinstamce";

function NewestFive ({amount, buttons}) {

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

    const newestFive = [...goods].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, amount);

    return (
        <div className="container">
            {newestFive.map((good, idx) => (
                <div className="goods_card" key={good.id} style={{ '--position': idx + 1 }}>
                {good.discount === 0 ? <div class="discount"></div> : <div class="discount">-{good.discount}%</div>}
                <img src={good.image} alt={good.name} />
                <div className="good_info">
                    <div className="base_info">
                        <h3 className="name">{good.name}</h3>
                        <span className="article">Артикул: {good.article}</span>
                    </div>
                    <div className="info">
                        <span className="price">
                            Цена:   {good.discount === 0 ? 
                                    <div class="price-disc">{good.price} ₸</div> 
                                    :   
                                    <>
                                    <div class="price-disc">{good.price - (good.price * good.discount / 100)} ₸</div>
                                    <div class="regular disc">{good.price} ₸</div>
                                    </>
                                    }
                        </span>
                        <span className="height">Высота: {good.height} см</span>
                        <span className="weight">Вес: {good.weight} гр</span>
                    </div>
                    <div class="buttons" style={{display: buttons}}>
                        <a href="./product_page.html"><button class="more">Подробнее</button></a>
                        <button class="basket">В корзину</button>
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
}

export default NewestFive;