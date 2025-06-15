import plus from '../assets/imgs/plus-circle.svg';
import minus from '../assets/imgs/dash-circle.svg';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../utils/const';
import { useCorsinaContext } from '../context/CorsinaContext';
import { useState } from 'react';
import { a } from '../axios-api/axiosinstamce';

function Corsina() {
  const navigate = useNavigate();

  const {
    corsinaItems,
    removeFromCorsina,
    increseQuantity,
    decreaseQuantity,
    TotalQuantity,
    TotalPrice,
    ClearCorsina
  } = useCorsinaContext();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    delivery: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, delivery } = formData;
    

    if (!name || !phone || !delivery) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }

    const orderDetails = {
      customer: formData,
      items: corsinaItems,
      totalQuantity: TotalQuantity,
      totalPrice: TotalPrice,
      orderTime: new Date().toLocaleString()
    };

    try {
      await a.post('/Orders', orderDetails);
      alert("Заказ успешно оформлен!");
      setIsSubmitted(true);
      ClearCorsina();
      setFormData({ name: '', phone: '', delivery: '' });
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      alert("Ошибка при оформлении заказа. Повторите позже.");
    }
  };

  const orderForm = (
    <div className="corsina_container">
      <h2>Заполните данные для заказа</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ваше имя</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Напишите ваше имя"
          required
          disabled={isSubmitted}
        />

        <label htmlFor="phone">Ваш номер телефона</label>
        <div className="phone-input">
          <select disabled>
            <option value="+7">🇰🇿 +7</option>
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+7 (999) 999-99-99"
            required
            disabled={isSubmitted}
          />
        </div>

        <label>Вариант доставки</label>
        <div className="delivery-options">
          {[
            { value: "pickup", label: "Самовывоз в Алматы" },
            { value: "delivery_almaty", label: "Доставка по Алматы" },
            { value: "kazpost", label: "Доставка в отделение Казпочты" },
            { value: "courier", label: "Курьерская доставка" },
            { value: "delivery_kz", label: "Доставка по Казахстану" }
          ].map((option) => (
            <label key={option.value} className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value={option.value}
                checked={formData.delivery === option.value}
                onChange={handleInputChange}
                disabled={isSubmitted}
              />
              {option.label}
            </label>
          ))}
        </div>

        <button className="submit-button" type="submit" disabled={isSubmitted}>Отправить</button>
      </form>

      <div className="order-summary">
        <p className="total">Сумма: <strong>{TotalPrice} ₸</strong></p>
      </div>
    </div>
  );

  return (
    <div className="class_regulator">
      {corsinaItems.length > 0 && orderForm}

      {corsinaItems.length === 0 ? (
        <div className="cart">
          <div className="empty-cart-message">
            <h2>Корзина пуста</h2>
            <p>Добавьте товары в корзину, чтобы оформить заказ.</p>
            <button className="continue-shopping" onClick={() => navigate(HOME)}>
              Продолжить покупки
            </button>
          </div>
        </div>
      ) : (
        <div className="cart">
          {corsinaItems.map((good) => (
            <div className="cart-good" key={good.id}>
              <img src={good.image} alt={good.name} />
              <div className="cart-info">
                <div className="cart-title">{good.name}</div>
                <div className="cart-article">Артикул: {good.article}</div>
              </div>
              <div className="cart-actions">
                <div className="quantity">
                  <button type="button" onClick={() => decreaseQuantity(good.id)}>
                    <img src={minus} alt="minus_svg" />
                  </button>
                  <span>{good.quantity}</span>
                  <button type="button" onClick={() => increseQuantity(good.id)}>
                    <img src={plus} alt="plus_svg" />
                  </button>
                </div>
                <div className="cart-price">{good.price * good.quantity} ₸</div>
                <button className="remove" onClick={() => removeFromCorsina(good.id)}>✖</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Corsina;
