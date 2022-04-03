import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarShown: false,
    isCartOpen: false,
    isOrderOpen: false
}

const showSidebar = state => {state.isSidebarShown = true};
const hideSidebar = state => {state.isSidebarShown = false};

const openCart = state => {state.isCartOpen = true};
const closeCart = state => {state.isCartOpen = false};

const openOrder = state => {state.isOrderOpen = true};
const closeOrder = state => {state.isOrderOpen = false};

const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        showSidebar,
        hideSidebar,
        openCart,
        closeCart,
        openOrder,
        closeOrder
    }
});



export const UIActions = UISlice.actions;
export default UISlice;

