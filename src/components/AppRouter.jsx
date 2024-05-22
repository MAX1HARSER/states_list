import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";

const AppRouter = () => {
    const isAuth = false;
    return (
        isAuth ?
            <Routes>
                {
                    privateRoutes.map(route =>
                    <Route path={route.path} element={route.component} exact={route.exact}/>
                )}
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(route =>
                    <Route path={route.path} element={route.component} exact={route.exact}/>
                )}
            </Routes>
    );
};

export default AppRouter;