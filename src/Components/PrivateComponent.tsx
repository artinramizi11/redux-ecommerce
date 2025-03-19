import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store/store'

const PrivateComponent = ({children}: {children: ReactNode}) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
  return isLogged ? children : <Navigate to='/login' />
}

export default PrivateComponent