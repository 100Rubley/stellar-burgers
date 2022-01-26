import React, { FC } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../bureger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'
import s from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeCurrentIngredient } from '../../services/actions/ingredients-actions'
import { requestIngredients } from '../../services/actions/ingredients-actions'
import { postOrder } from '../../services/actions/constructor-actions'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Login from '../../pages/login/login'
import SignUp from '../../pages/sign-up/sign-up'
import NewPassword from '../../pages/new-password/new-password'
import ResetPassword from '../../pages/reset-password/reset-password'
import Profile from '../../pages/profile/profile'
import Error404 from '../../pages/error404/error404'
import ProtectedRoute from '../protected-route/protected-route'
import { getUserData } from '../../services/actions/user-actions'

interface IBackgroundLocation {
  background: {
    pathname: string
    search: string
    hash: string
    state: any
    key: string
  }
}

const App: FC = () => {
  const ModalSwitch: FC = () => {
    const location = useLocation<IBackgroundLocation | undefined>()
    const history = useHistory()
    const dispatch = useDispatch()

    const background = location.state && location.state.background

    React.useEffect(() => {
      // redux пока не переделываем на ts
      dispatch(requestIngredients());
      dispatch(getUserData())
    }, [dispatch]);

    const isAuth = useSelector((state: any) => state.user.isAuth)
    // используется для того, чтобы отобразить/убрать оверлей

    // boolean
    const [isPopup, setIsPopup] = React.useState(false)
    // string
    const [modalType, setModalType] = React.useState('order')

    const togglePopup: () => void = () => {
      setIsPopup(!isPopup)
      if (isPopup) {
        dispatch(removeCurrentIngredient())
        if (modalType !== 'order') {
          history.goBack()
        }
      }
    }

    const closeOnESC: (e: KeyboardEvent) => void = e => {
      if (e.key === 'Escape') {
        dispatch(removeCurrentIngredient())
        togglePopup()
      }
    }

    const setModalIngredientType = () => {
      setModalType('ingredient')
    }
    const setModalOrderType = () => {
      setModalType('order')
    }
    // ------------------------------------------------------------

    const handleOrderRequest = (data: string[]) => {
      if (!isAuth) {
        history.replace({ pathname: '/login', state: { form: location } })
      } else {
        dispatch(postOrder(data))
        setIsPopup(!isPopup)
        history.replace({ pathname: '/' })
      }
    }

    return (
      <>
        <AppHeader />

        <Switch location={background || location}>
          <Route path='/' exact>
            <div className={s.wrapper}>
              <div onClick={setModalIngredientType}>
                <BurgerIngredients handleClick={togglePopup} />
              </div>
              <div onClick={setModalOrderType}>
                <BurgerConstructor handleRequest={handleOrderRequest} />
              </div>
            </div>
          </Route>

          <Route path='/ingredients/:ingredientId' exact>
            <IngredientDetails />
          </Route>

          <Route path='/login' exact>
            <Login />
          </Route>

          <Route path='/register' exact>
            <SignUp />
          </Route>

          <Route path='/forgot-password' exact>
            <NewPassword />
          </Route>

          <Route path='/reset-password' exact>
            <ResetPassword />
          </Route>

          <ProtectedRoute path='/profile' exact>
            <Profile />
          </ProtectedRoute>

          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>

        {background && isPopup && (
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal handleKeyPress={closeOnESC} handleCloseButtonClick={togglePopup} headerTitle={'Детали ингредиента'}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}

        {modalType === 'order' && isPopup &&
          <Modal handleKeyPress={closeOnESC} handleCloseButtonClick={togglePopup} headerTitle={null} >

            <OrderDetails />

          </Modal>
        }
      </>
    );
  }
  return <ModalSwitch />
}

export default App;
