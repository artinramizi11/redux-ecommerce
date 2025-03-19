import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
    id: number,
    title: string,
    description: string,
    price: number,
    tags: string[],
    images: string[]
}

export type Order = Product[]

type initialStateType = {
    products: Product[],
    productById: Product | undefined,
    cartItems: Product[],
    orders: Order[],
    totalOrders: number,
    totalCartItems: number,
  
}

const initialState: initialStateType = {
    products: [],
    productById: undefined,
    cartItems: [],
    orders: [],
    totalOrders: 0,
    totalCartItems: 0,


}

export const ProductsSlice = createSlice({
    name:"products",
    initialState,
    reducers: {
        getProducts: (state,action: PayloadAction<Product[]>) => {
            state.products = action.payload

        },
        getProductById: (state,action: PayloadAction<{id: number}>) => {
            const product = state.products.find((product) => product.id === action.payload.id)
            state.productById = product || undefined
        },
        addToCart: (state,action: PayloadAction<Product>) => {
            const productExists = state.cartItems.find((product) => product.id === action.payload.id)
            if(!productExists) {
             state.cartItems.push(action.payload)
            }
            state.totalCartItems = state.cartItems.length
         },
        removeItemFromCart: (state,action: PayloadAction<{id: number}>) => {
            state.cartItems = state.cartItems.filter((product) => product.id !== action.payload.id)
            state.totalCartItems = state.cartItems.length
        },
        checkOutCart: (state) => {
            state.orders.push(state.cartItems)
            state.totalOrders = state.orders.length
            state.cartItems = []
            state.totalCartItems = state.cartItems.length
        },


    }
})

export default ProductsSlice.reducer
export const {getProducts,getProductById,addToCart,removeItemFromCart,checkOutCart} = ProductsSlice.actions 