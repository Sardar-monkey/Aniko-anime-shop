function GoodsCard ({good}) {
    return (
                <div class="goods_card">
                    {good.discount === 0 ? <div class="discount"></div> : <div class="discount">-{good.discount}%</div>}
                    <img src={good.image} alt="" />
                    <div class="good_info">
                        <div class="base_info">
                            <h3 class="name">{good.name}</h3>
                            <span class="article">Артикул : {good.article}</span>
                        </div>

                        <div class="info">
                            <span class="price">Цена:
                                {good.discount === 0 ? 
                                <div class="price-disc">{good.price}</div> 
                                : 
                                <>
                                <div class="price-disc">{good.price - (good.price * good.discount / 100)} ₸</div>
                                <div class="regular disc">{good.price} ₸</div>
                                </>
                                }
                            </span>

                            <span class="height">Высота: {good.height}см</span>
                            <span class="weight">Вес: {good.weight}гр</span>
                        </div>
                        <div class="buttons">
                            <a href="./product_page.html"><button class="more">Подробнее</button></a>
                            <button class="basket">В корзину</button>
                        </div>
                    </div>
                </div>
    );
}

export default GoodsCard;