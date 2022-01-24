import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

interface IProtectedRoute {
  path: string
  exact: boolean
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const isAuth = useSelector((state: any) => state.user.isAuth)

  return (
    <Route {...rest} render={({ location }) =>
      isAuth ?
        (children) :
        (
          <Redirect
            to={{ pathname: '/login', state: { form: location } }}
          />
        )
    } />
  )
}

export default ProtectedRoute
