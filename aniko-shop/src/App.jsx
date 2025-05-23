import "./assets/CSS/style.css"
import AppRouter from "./components/AppRouter.jsx";
import Header from "./components/Header.jsx";

function App () {
  return (
    <>
    <body>
      <Header />
      <main>
        <AppRouter />
      </main>
    </body>
    </>
  );
}

export default App;