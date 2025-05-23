import { useEffect, useState } from "react";
import eva from "../assets/imgs/eva.jpg"
import jojo from "../assets/imgs/jojo2.jpg"
import naruto from "../assets/imgs/naruto2.jpg"
import GoodsList from "../components/GoodsList";
import NewestFive from "../components/NewestFive";
import { a } from "../axios-api/axiosinstamce";

function Home() {

    const [categories, SetCategories] = useState([]);

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
