import { useEffect, useState } from "react";
import eva from "../assets/imgs/eva.jpg"
import jojo from "../assets/imgs/jojo2.jpg"
import naruto from "../assets/imgs/naruto2.jpg"
import GoodsList from "../components/GoodsList";
import NewestFive from "../components/NewestFive";
import { a } from "../axios-api/axiosinstamce"
import Corsina from "./Corsina";
import { Link } from "react-router-dom";
import { CORSINA } from "../utils/const";
import { useCorsinaContext } from "../context/CorsinaContext";

function Home() {

    const [categories, SetCategories] = useState([]);
    const {TotalQuantity} = useCorsinaContext();

    useEffect(() => {
        async function fetchCategories () {
            try {
                const res = await a.get('/Goods');
                const uniqueCategories = [...new Set(res.data.map(item => item.category))];
                SetCategories(uniqueCategories);
            } catch (error) {
                console.error("Error : ", error)
            }
        }

        fetchCategories();
        
    }, []);

    return (
        <>
            <div className="images">
                <img src={eva} alt="" />
                <img src={jojo} alt="" />
                <img src={naruto} alt="" />
            </div>

            <Link  to= {CORSINA} >
        <div class="basket-buy">
            <div class="amount">
                <span class="quantity">{TotalQuantity}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="#000000" class="bi bi-basket2-fill" viewBox="0 0 16 16">
                <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1"/>
            </svg>
        </div>
            </Link>

            <section className="goods all">
                <h2 className="title">Новинки!</h2>
                <div className="container-carusel" style={{ '--amount': 5 }}>
                    <div className="carusel">
                        <NewestFive amount={5} buttons={"none"}/>
                    </div>
                </div>
            </section>
            
            {categories.map((category) => (
            <GoodsList category={category} />
            ))}
        </>
    );
}

export default Home;
