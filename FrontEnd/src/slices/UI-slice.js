import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarShown: false,
    isCartOpen: false
}

const showSidebar = state => {state.isSidebarShown = true};
const hideSidebar = state => {state.isSidebarShown = false};

const openCart = state => {state.isCartOpen = true};
const closeCart = state => {state.isCartOpen = false};

const UISlice = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        showSidebar,
        hideSidebar,
        openCart,
        closeCart
    }
});



export const UIActions = UISlice.actions;
export default UISlice;

