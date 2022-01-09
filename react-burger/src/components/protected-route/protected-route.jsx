import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <Route {...rest} render={() =>
      isAuth ?
        (children) :
        (<Redirect to='/login' />)
    } />
  )
}

export default ProtectedRoute
