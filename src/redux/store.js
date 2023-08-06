import {combineReducers, configureStore} from '@reduxjs/toolkit'
import productReducer from './ProductSlice';
import userReducers from './UserProductSlice';


const rootReducers = combineReducers({
    products: productReducer,
    cart: userReducers,
});

const store = configureStore({

    reducer: rootReducers,
});

export default store;
