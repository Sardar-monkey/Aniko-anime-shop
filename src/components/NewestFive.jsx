import { useEffect, useState } from "react";
import { a } from "../axios-api/axiosinstamce";
import { Link } from "react-router-dom";
import { PRODUCTPAGE } from "../utils/const";
import { useCorsinaContext } from "../context/CorsinaContext";

function NewestFive ({amount, buttons, good}) {

    const [goods, SetGoods] = useState([]);

    const { addToCorsina } = useCorsinaContext();
    
    function handleAddToCorsina() {
        addToCorsina(good);
    }

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
                <Link to = {PRODUCTPAGE.substring(0, PRODUCTPAGE.length - 3)+ good.id} className="goods_card" key={good.id} style={{ '--position': idx + 1 }}>
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
                       <Link to = {PRODUCTPAGE.substring(0, PRODUCTPAGE.length - 3)+ good.id} class="more">Подробнее</Link>
                           <button className="basket" onClick={handleAddToCorsina}>
                            В корзину
                            </button>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}

export default NewestFive;