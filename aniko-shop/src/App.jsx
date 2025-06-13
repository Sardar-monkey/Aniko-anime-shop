import "./assets/CSS/style.css"
import AppRouter from "./components/AppRouter.jsx";
import Header from "./components/Header.jsx";

function App () {
  return (
    <>
      <Header />
      <main>
        <AppRouter />
      </main>
    </>
  );
}

export default App;