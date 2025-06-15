import "./assets/CSS/style.css"
import AppRouter from "./components/AppRouter.jsx";
import Header from "./components/Header.jsx";
import { CorsinaProvider } from "./context/CorsinaContext.jsx";

function App () {
  return (
    <CorsinaProvider>
  <Header />
  <main>
    <AppRouter />
  </main>
</CorsinaProvider>

  );
}

export default App;