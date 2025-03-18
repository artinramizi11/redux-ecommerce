import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import { Navigate } from 'react-router-dom'

const PrivateComponent = ({children}: {children: ReactNode}) => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)
  return isLogged ? children : <Navigate to='/login' />
}

export default PrivateComponent