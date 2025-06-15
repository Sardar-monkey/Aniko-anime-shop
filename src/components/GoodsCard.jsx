import { Link } from "react-router-dom";
import { useCorsinaContext } from "../context/CorsinaContext";
import { PRODUCTPAGE } from "../utils/const";

function GoodsCard({ good }) {
  const { addToCorsina } = useCorsinaContext();

  function handleAddToCorsina() {
    addToCorsina(good);
  }

  const discountedPrice = good.price - (good.price * good.discount / 100);

  return (
    <div className="goods_card">
      {/* Скидка */}
      {good.discount === 0 ? (
        <div className="discount"></div>
      ) : (
        <div className="discount">-{good.discount}%</div>
      )}

      {/* Картинка */}
      <img src={good.image} alt={good.name} />

      {/* Информация о товаре */}
      <div className="good_info">
        <div className="base_info">
          <h3 className="name">{good.name}</h3>
          <span className="article">Артикул: {good.article}</span>
        </div>

        <div className="info">
          <span className="price">Цена:</span>
          {good.discount === 0 ? (
            <div className="price-disc">{good.price} ₸</div>
          ) : (
            <>
              <div className="price-disc">{discountedPrice} ₸</div>
              <div className="regular disc">{good.price} ₸</div>
            </>
          )}
          <span className="height">Высота: {good.height} см</span>
          <span className="weight">Вес: {good.weight} гр</span>
        </div>

        {/* Кнопки */}
        <div className="buttons">
          <Link to={`${PRODUCTPAGE.slice(0, -3)}${good.id}`} className="more">
            Подробнее
          </Link>
          <button className="basket" onClick={handleAddToCorsina}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoodsCard;
