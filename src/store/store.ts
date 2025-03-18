import { configureStore, ReducerType } from "@reduxjs/toolkit";
import { ProductsSlice } from "./productsSlice";
import { AuthSlice } from "./authSlice";

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        products: ProductsSlice.reducer,
        auth: AuthSlice.reducer
    }
})