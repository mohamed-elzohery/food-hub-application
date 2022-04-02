import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartCount: 0,
    cartTotalPrice: 0,
}

const addItem = (state, action) => {
    const addedItem = action.payload;
    const indexOfItem = state.cartItems.findIndex((item) => item.id === addedItem.id);
    if(indexOfItem === -1){
        state.cartItems.push(addedItem);
    }else{
        state.cartItems[indexOfItem].amount += addedItem.amount;
    }
    state.cartCount += addedItem.amount;
    state.cartTotalPrice += addedItem.amount * addedItem.price;
}

const removeItem = (state, action) => {
    const removedItem = action.payload;
    const indexOfItem = state.cartItems.findIndex((item) => item.id === removedItem.id);
    if(state.cartItems[indexOfItem].amount === 1){
        state.cartItems = state.cartItems.filter(meal => meal.id !== removedItem.id);
    }else{
        state.cartItems[indexOfItem].amount -= removedItem.amount;
    }
    state.cartCount -= removedItem.amount;
    state.cartTotalPrice -= removedItem.amount * removedItem.price;
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem,
        removeItem
    }
});

export const CartActions = cartSlice.actions;
export default cartSlice;