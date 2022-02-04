import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import { Redirect, Route } from 'react-router-dom'
import { getUserData } from '../../services/actions/user-actions'

interface IUnauthRoute {
  path: string
  exact?: boolean
}

const UnauthRedirect: FC<IUnauthRoute> = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()

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
            <Redirect to={{ pathname: '/' }}
            />
          )
      } />
      : null
  )
}

export default UnauthRedirect
