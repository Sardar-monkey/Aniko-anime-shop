import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { a } from "../axios-api/axiosinstamce";
import GoodsCard from "../components/GoodsCard"

function SearchedGoods() {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        async function fetchSearchResults() {
            try {
                const response = await a.get("/Goods"); // Замените URL на свой Mocky
                const results = response.data.filter((good) => good.name.toLowerCase().includes(query.toLowerCase()));
                setSearchResults(results);
            } catch (err) {
                setError("Ошибка при загрузке данных.");
            }
        }

        if (query) fetchSearchResults();
    }, [query]);

    return (
        <section className="goods all">
            <h2 class="title">Результаты поиска : {query}</h2>
            <div class="container">                
                {searchResults.length > 0 ? (
                    searchResults.map((good) => (
                        <GoodsCard key={good.id} good={good}/>
                    ))
                ) : (
                    <p>Ничего не найдено.</p>
                )}
            </div>
        </section>
    );
}

export default SearchedGoods;
