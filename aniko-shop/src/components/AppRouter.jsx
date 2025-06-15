import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes."; // без точки в конце!

function AppRouter() {
    return (
        <Routes>
            {routes.map((route, index) => {
                const Component = route.element; // получить компонент
                return <Route key={index} path={route.path} element={<Component />} />;
            })}
        </Routes>
    );
}

export default AppRouter;
