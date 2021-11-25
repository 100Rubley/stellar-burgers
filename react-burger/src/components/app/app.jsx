import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../bureger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'
import s from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIngredient, removeCurrentIngredient } from '../../services/actions/ingredients-actions'
import { requestIngredients } from '../../services/actions/ingredients-actions'
import { postOrder } from '../../services/actions/constructor-actions'
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/login'
import SignUp from '../pages/sign-up'
import RecreatePassword from '../pages/new-password'
import ResetPassword from '../pages/reset-password'
import Profile from '../pages/profile'
import Error404 from '../pages/error404'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(requestIngredients());
  }, [dispatch]);

  // используется для того, чтобы отобразить/убрать оверлей
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const currentIngredient = useSelector(state => state.ingredients.currentIngredient)

  const [isPopup, setIsPopup] = React.useState(false)
  const [modalType, setModalType] = React.useState('order')

  const togglePopup = (e) => {
    setIsPopup(!isPopup)
    if (isPopup) {
      dispatch(removeCurrentIngredient())
    }

    if (e) {
      dispatch(setCurrentIngredient(ingredients.find(i => i._id === e.currentTarget.id)))
    }
  }

  const closeOnESC = (e) => {
    if (e.key === 'Escape') {
      dispatch(removeCurrentIngredient())
      setIsPopup(!isPopup)
    }
  }

  const setModalIngredientType = () => {
    setModalType('ingredient')
  }
  const setModalOrderType = () => {
    setModalType('order')
  }
  // ------------------------------------------------------------

  const handleOrderRequest = (data) => {
    dispatch(postOrder(data))
    setIsPopup(!isPopup)
  }

  return (
    <div>
      <AppHeader />

      <Switch>
        <Route path='/' exact>
          <div className={s.wrapper}>
            <div onClick={setModalIngredientType}>
              <BurgerIngredients handleClick={togglePopup} />
            </div>
            <div onClick={setModalOrderType}>
              <BurgerConstructor handleClick={togglePopup} handleRequest={handleOrderRequest} />
            </div>
          </div>
        </Route>

        <Route path='/login' exact>
          <Login />
        </Route>

        <Route path='/register' exact>
          <SignUp />
        </Route>

        <Route path='/forgot-password' exact>
          <RecreatePassword />
        </Route>

        <Route path='/reset-password' exact>
          <ResetPassword />
        </Route>

        <Route path='/profile' exact>
          <Profile />
        </Route>

        <Route path='*'>
          <Error404 />
        </Route>
      </Switch>



      {isPopup &&
        <Modal handleKeyPress={closeOnESC} handleCloseButtonClick={togglePopup} headerTitle={modalType === 'ingredient' && 'Детали ингредиента'} >
          {
            modalType === 'order'
              ? <OrderDetails />
              : <IngredientDetails data={currentIngredient} />
          }
        </Modal>
      }
    </div>
  );
}

export default App;
