import React, {useEffect, useMemo, useRef, useState} from "react";
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
import { IoCreateOutline } from 'react-icons/io5';


const Posts = (props) => {

    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef()
    let pagesArray = getPagesArray(totalPages)

    const [fetchPost, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })

    const [modal, setModal] = useState(false)

    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(i => {
            return i.id !== post.id
        }))
    }

    useEffect(() => {
        fetchPost()
    }, [page, limit])

    const changePost = (page) => {
        setPage(page)
    }


    return (
        <div className="App">
            <MyButton
                style={{marginTop: '10px'}}
                onClick={() => setModal(true)}>
                Добавить товар  <IoCreateOutline/>
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}>
                <ProductForm create={createPost}/>
            </MyModal>
            <hr
                style={{margin: '15px 0'}}/>
            <ProductFilter
                filter={filter}
                setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Количество элементов'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 20, name: '20'},
                    {value: -1, name: 'Все'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка 404</h1>}
            <ProductList
                posts={sortedAndSearchedPosts}
                title={'Sanarip shop doolboor'}
                remove={removePost}/>
            <div
                style={{background: 'teal'}}
                ref={lastElement} // - здесь я передал качестве ref - ту переменную в котором будет сидеть этот элемент!
            >-
            </div>
            {isPostLoading &&
                <div
                    style={{display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'}}
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

export default Posts;
