import { createSlice } from "@reduxjs/toolkit";

const intialState =JSON.parse(localStorage.getItem('cartItem')) || []

const cartSlice = createSlice({
    name: 'cart',
    initialState: intialState,
    reducers: {

        addToCart(state, action) {
            const itemIndex = state.findIndex((item) => item.id === action.payload.id);
            if(itemIndex === -1) {
                state.push({
                    ...action.payload,
                    quantity: 1})
            }
            else{
                state[itemIndex].quantity += 1
            }
        },
        deleteFromCart(state, action) {
            return state.filter((item) => item.id !== action.payload.id)
        },

        isItemAdded(state, action) {
            const itemIndex = state.findIndex((item) => item.id === action.payload.id);
            if(itemIndex === -1) {
                return null
            }
            else{
                return state[itemIndex]
            }
        }
    }
})

export const { addToCart,deleteFromCart ,isItemAdded} = cartSlice.actions
export default cartSlice.reducer