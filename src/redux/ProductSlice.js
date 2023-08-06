import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import PostService from "../API/PostService";


const initialState = [
    {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 12,
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category"\n' +
            '// :\n' +
            '//     "men\'s clothing',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: {
            rate: 3.9,
            count: 120
        }
    }
]

export const fetchAllProduct = createAsyncThunk(
    'product/fetchAllProduct',
    async (userId, thunkAPI) => {
        const response = await PostService.getAll()
        return response.data
    }
)


export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        createPost: (state, action) => {
            const newPost = {
                // ...action.post,
                id: Date.now(),
            };
            state.push(newPost)
            action.setPost({title: '', body: '', image: ''})
        },
        // sortedPost: (state, action) => {
        //      state.sort()
        // },
        searchProduct: (state, action) => {
            const { title } = action.payload;
            return state.filter(product => product.title.includes(title));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.unshift(...action.payload)
        });
    }

    // action.setPosts([...posts, newPost])
})

export const {searchProduct, setPosts,} = productSlice.actions;

export default productSlice.reducer;