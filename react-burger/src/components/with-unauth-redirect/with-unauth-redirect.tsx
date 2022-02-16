import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { getUserData } from '../../services/actions/user-actions'
import { ROUTES } from '../../utils/constants'

interface IUnauthRoute {
  path: string
  exact?: boolean
}

const UnauthRedirect: FC<IUnauthRoute> = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation<any>()
  const locationFrom = location.state?.from;
  const redirectUrl = locationFrom ? locationFrom.pathname : ROUTES.home.path;

  useEffect(() => {
    dispatch(getUserData())
    setIsLoaded(true)
  }, [dispatch])

  return (
    isLoaded
      ? <Route {...rest} render={() =>
        !isAuth ?
          (children) :
          (
            <Redirect to={{ pathname: redirectUrl }}
            />
          )
      } />
      : null
  )
}

export default UnauthRedirect
