import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {searchProduct} from "../../redux/ProductSlice";

export const useSortedPosts = (posts, sort) => {

    const dispatch = useDispatch()


    const sortedPost = useMemo(() => {
        if (sort) {
            return [...posts]
        }
        return posts
    }, [sort, posts])

    return sortedPost;
}

export const usePosts = (post, sort, query) => {

    const dispatch = useDispatch()

    const sortedPost = useSortedPosts(post, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        dispatch(searchProduct(query));
    }, [query, sortedPost])
    return sortedAndSearchedPosts;
}