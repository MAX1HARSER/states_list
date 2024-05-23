import React, {useContext} from 'react';
import {Route, Routes, RedirectFunction} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";
import {AuthContext} from "../context";

const AppRouter = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    return (
        isAuth ?
            <Routes>
                {
                    privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                        key = {route.path}
                    />

                )}
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                        key = {route.path}
                    />

                )}
                {/*<Redirect to='/login'/>*/}
            </Routes>
    );
};

export default AppRouter;