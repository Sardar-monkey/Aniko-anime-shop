import backbutton from "../assets/imgs/backbtn.svg"
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCorsinaContext } from "../context/CorsinaContext";
import { CORSINA } from "../utils/const";

function ProductPage() {
    const { id } = useParams();
    const [good, setGood] = useState({});
    const [currentImage, setCurrentImage] = useState(0);

      const { addToCorsina } = useCorsinaContext();
    
      function handleAddToCorsina() {
        addToCorsina(good);
      }

    useEffect(() => {
        async function fetchGood() {
            try {
                const response = await axios.get(`https://e11265d6c95cbd1f.mokky.dev/Goods/${id}`);
                setGood(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        }

        fetchGood();
    }, [id]);

    const images = good.images || [];

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };


    const hasDiscount = good.discount > 0;
    const discountedPrice = hasDiscount
        ? good.price - good.price * (good.discount / 100)
        : good.price;

    return (
        <main className="prod_body">
            <header className="header_special">
                <div className="container">
                    <Link to="/">
                        <img src={backbutton} alt="back-button" className="back-button" />
                    </Link>
                </div>
            </header>

            <div className="for_flex">
                <div className="product-container">
                    <div className="gallery">
                        <div className="gallery-images">+
                                <img src={good.image} alt="" />
                        </div>
                    </div>

                    <div className="product-details">
                        <h1 className="product-title">{good.name}</h1>
                        <p className="product-subtitle">{good.description || 'Описание товара'}</p>

                        <div className="product-sizes">
                            {good.sizes?.map((size) => <span key={size}>{size}</span>)}
                        </div>
                        <p className="product-subtitle">Артикуль : {good.article}</p>
                        <div className="info-abt-product">
                            <h2>Характеристики</h2>
                            <table className="product-info-table">
                            <tr>
                            <td class="left">Высота</td>
                            <td class="dots"></td>
                            <td class="right">{good.height} см</td>
                            </tr>
                            <tr>
                              <td class="left">Вес</td>
                            <td class="dots"></td>
                            <td class="right">{good.weight} гр</td>
                            </tr>
                            <tr>
                              <td class="left">Категория</td>
                            <td class="dots"></td>
                            <td class="right">{good.category}</td>
                            </tr>
                            </table>
                        </div>

                        <div className="price-card">
                            <div className="current-price">
                                {good.price - (good.price * good.discount / 100)} ₸
                            </div>
                            {hasDiscount && (
                                <div className="old-price">
                                    <s> {good.price} ₸ </s>
                                </div>
                            )}
                            <div className="price-note">Цена за 1 штуку</div>
                            <div className="buttons">
                                <button className="cart-button" onClick={handleAddToCorsina} >В корзину</button>
                                <Link to={CORSINA} className="buy-button" onClick={handleAddToCorsina}>Купить сейчас</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductPage;
