import React, {useEffect, useState} from 'react';
import './component/styles/App.css'
import {BrowserRouter} from "react-router-dom";
import Navbar from "./component/Navbar";
import AppRouter from "./component/AppRouter";
import {AuthContext} from "./context";
import {Provider} from "react-redux";
import store from './redux/store'

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [_, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setIsLoading(false);

    }, [])

    return (
        <div>
            <Provider store={store}>
                <AuthContext.Provider value={
                    {
                        isAuth,
                        setIsAuth,
                        setIsLoading,
                    }
                }>
                    <BrowserRouter>
                        <Navbar/>
                        <AppRouter/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </Provider>
        </div>
    );
};

export default App;