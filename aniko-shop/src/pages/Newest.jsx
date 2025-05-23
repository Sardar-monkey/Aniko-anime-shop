import NewestFive from "../components/NewestFive";

function Newest () {
    return (
        <section class="goods all">
            <h2 class="title">Новинки!</h2>
            <NewestFive amount={10}/>
        </section>
    );
}

export default Newest;