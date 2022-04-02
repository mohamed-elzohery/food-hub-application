import UISlice from './slices/UI-slice';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/Cart-slice';

const store = configureStore({
    reducer :{
        UI: UISlice.reducer,
        cart: cartSlice.reducer
    }
});

export default store;