import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { getUserData } from '../../services/actions/user-actions'
import { ROUTES } from '../../utils/constants'

interface IProtectedRoute {
  path: string
  exact?: boolean
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const isAuth = useSelector((state: any) => state.user.isAuth)
  const [isLoaded, setIsLoaded] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData())
    setIsLoaded(true)
  }, [dispatch])

  if (!isLoaded) return null

  return (
    <Route {...rest} render={() =>
      isAuth ?
        (children) :
        (
          <Redirect
            to={{ pathname: ROUTES.login.path, state: { from: location } }}
          />
        )
    } />
  )
}

export default ProtectedRoute
