import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCartProduct} from "../../redux/UserProductSlice";
import ProductList from "../ProductList";

const Cart = () => {
    const cartProducts = useSelector(state => state.cart.cartProducts)
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchCartProduct())
    }, [])

    return (
        <div className='basket'>
            {
                cartProducts.length >= 1
                    ? <h1> У вас нет товара в корзине</h1>
                    : <ProductList title={'Корзина'} posts={cartProducts} />
            }
        </div>
    );
};

export default Cart;