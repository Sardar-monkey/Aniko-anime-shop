import { useParams } from "react-router-dom";
import GoodsList from "../components/GoodsList";

function GoodsByCategory () {

    const {category} = useParams();

    return( 
        <section class="goods all">
            <GoodsList category={category} />
        </section>
    );
}

export default GoodsByCategory;