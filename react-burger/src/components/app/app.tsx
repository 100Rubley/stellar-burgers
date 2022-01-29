import React, { FC } from 'react'
import AppHeader from '../app-header/app-header'
import { Switch, Route, useLocation } from 'react-router-dom';
import Login from '../../pages/login/login'
import SignUp from '../../pages/sign-up/sign-up'
import NewPassword from '../../pages/new-password/new-password'
import ResetPassword from '../../pages/reset-password/reset-password'
import Profile from '../../pages/profile/profile'
import Error404 from '../../pages/error404/error404'
import ProtectedRoute from '../protected-route/protected-route'
import { ROUTES } from '../../utils/constants'
import MainContentContainer from '../main-content-container/main-content-container'
import IngredientContainer from '../../pages/ingredient/ingredient-container'
import { IIngredient, ILocation } from '../../utils/types';

interface IAppProps {
  ingredients: [
    ingredient: IIngredient
  ]
}

const App: FC<IAppProps> = ({ ingredients }) => {
  const location = useLocation<ILocation>()
  const background = location.state && location.state.background

  return (
    <>
      <AppHeader />

      <Switch location={background || location}>
        <Route path={ROUTES.home.path} exact>
          <MainContentContainer />
        </Route>

        <Route path={ROUTES.ingredient.path}>
          <IngredientContainer ingredients={ingredients}/>
        </Route>

        <Route path={ROUTES.login.path} exact>
          <Login />
        </Route>

        <Route path={ROUTES.register.path} exact>
          <SignUp />
        </Route>

        <Route path={ROUTES.forgotPassword.path} exact>
          <NewPassword />
        </Route>

        <Route path={ROUTES.resetPassword.path} exact>
          <ResetPassword />
        </Route>

        <ProtectedRoute path={ROUTES.profile.path} exact>
          <Profile />
        </ProtectedRoute>

        <Route path='*'>
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
