import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 type initialStateType = {
        selectedPage: number,
        pageSize: number,
        searchQuery: string,
        searchByPrice: number | null
    
}

const initialState: initialStateType = {

        selectedPage: 1,
        pageSize: 6,
        searchQuery: "",
        searchByPrice: 0
    
}

export const filterProductsSlice = createSlice({
    name: "filter_products",
    initialState,
    reducers: {
        selectPage: (state,action: PayloadAction<{page: number}>) => {
            state.selectedPage = action.payload.page
        },
        setSearchQuery: (state,action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
        setSearchByPrice: (state, action: PayloadAction<number>) => {
            state.searchByPrice = action.payload
        }

    }
})

export default filterProductsSlice.reducer
export const {selectPage,setSearchQuery,setSearchByPrice} = filterProductsSlice.actions