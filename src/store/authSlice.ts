import { createSlice } from "@reduxjs/toolkit";

type initialStateTypes = {
    isLogged: boolean
}

const initialState: initialStateTypes = {
    isLogged: false

}

export const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogged = true
        },
        logOut: (state) => {
            state.isLogged = false
        }

    }
})

export default AuthSlice.reducer
export const {login,logOut} = AuthSlice.actions