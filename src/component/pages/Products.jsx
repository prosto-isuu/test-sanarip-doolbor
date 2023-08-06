import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import '../styles/App.css'
import {getPagesArray, getPagesCount} from "../../uttils/pages";
import {useFetching} from "../hooks/useFetching";
import PostService from "../../API/PostService";
import MyButton from "../UI/Button/MyButton";
import MyModal from "../UI/Modal/MyModal";
import ProductFilter from "../ProductFilter";
import ProductList from "../ProductList";
import Loader from "../UI/Loader/Loader";
import ProductForm from "../UI/PostForm/ProductForm";
import {usePosts} from "../hooks/usePosts";
import {useObserver} from "../hooks/useObserver";
import {MySelect} from "../UI/Select/MySelect";
import {IoCreateOutline} from 'react-icons/io5';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllProduct, searchProduct} from "../../redux/ProductSlice";


const Products = (props) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products);
    const [posts, setPosts] = useState(products)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef()
    let pagesArray = getPagesArray(totalPages)


    const [fetchProduct, isProductLoadings, productErrors] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        dispatch(fetchAllProduct(response.data))
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    },);

    useObserver(lastElement, page < totalPages, isProductLoadings, () => {
        setPage(page + 1);
    })

    const [modal, setModal] = useState(false)

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [title, setTitle] = useState('');

    const onSearchHandler = useCallback((event) => {
        setTitle(event.currentTarget.value);
        dispatch(searchProduct(title))
    }, [title]);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const createProduct = (newPost) => {
        // event.preventDefault()
        // dispatch(newPost)
        setModal(false);
    }


    const addCart = (post) => {
        if (post) {
            // dispatch(removeProduct(post.id));
        }
        console.log(post)
    }

    useEffect(() => {
        fetchProduct()
    }, [page, limit])

    const changePost = (page) => {
        setPage(page)
    }


    return (
        <div className="App">
            <MyButton
                onClick={() => setModal(true)}>
                Добавить товар <IoCreateOutline/>
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}>
                <ProductForm create={createPost}/>
            </MyModal>
            <hr
                style={{margin: '15px 0'}}/>
            <ProductFilter
                filter={title}
                setFilter={onSearchHandler}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Количество товаров'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 20, name: '20'},
                    {value: -1, name: 'Все'},
                ]}
            />
            {productErrors &&
                <h1>Произошла ошибка 404</h1>}
            <ProductList
                posts={products}
                title={'Sanarip shop doolboor'}
                addCart={addCart}/>
            <div
                style={{background: 'teal'}}
                ref={lastElement} // - здесь я передал качестве ref - ту переменную в котором будет сидеть этот элемент!
            >-
            </div>
            {isProductLoadings &&
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Loader/>
                </div>}
            <div className='page__wrapper'>
                {pagesArray.map(p => {
                    return <span
                        onClick={() => changePost(p)}
                        className={page === p ? 'page page__current' : 'page'}
                        key={page}
                    >
                    {p}
                </span>
                })}
            </div>
        </div>
    );
}

export default Products;
