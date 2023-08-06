import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import PostService from "../API/PostService";
import {fetchAllProduct} from "./ProductSlice";



const initialState = {
    value: 0,
    cartProducts: [
        {

        }
    ]
}

export const fetchCartProduct = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        const response = await PostService.getAllCartProduct(userId)
        return response.data
    }
);
export const addCartProduct = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        const response = await PostService.addCart(productId)
        return response.data
    }
)

export const userProductSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.push(action.products)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartProduct.fulfilled, (state, action) => {
            state.push(...action.products)
        });
    }
})

export const { increment, decrement, incrementByAmount } = userProductSlice.actions

export default userProductSlice.reducer