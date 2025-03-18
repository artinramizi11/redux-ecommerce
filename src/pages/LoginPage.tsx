import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'

const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLogged = useSelector((state: RootState) => state.auth.isLogged)

    const [form, setForm] = useState({ username: "", password: "" })

    function handleLoginBtn() {
        if (form.username !== "" && form.password !== "") {
            dispatch(login())
            navigate("/")
        } else {
            alert("Fields can not be empty")
        }
    }

    useEffect(() => {
        if(isLogged){
            navigate("/")
        }
    },[isLogged])

    return (
        <div className="flex justify-center items-center h-full bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                            value={form.username}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                            value={form.password}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleLoginBtn}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
