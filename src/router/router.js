import About from "../component/pages/About";
import Products from "../component/pages/Products";
import ProductId from "../component/pages/ProductId";
import Login from "../component/pages/Login";
import Cart from "../component/pages/Cart";

export const privateRouters = [
    {path:'/about', component: About, exact:true},
    {path:'/posts', component: Products, exact:true},
    {path:'/posts/:id', component: ProductId, exact:true},
    {path:'/cart', component: Cart, exact:true},
]


export const publicRouters = [
        {path:'/login', component: Login, exact:true},
]