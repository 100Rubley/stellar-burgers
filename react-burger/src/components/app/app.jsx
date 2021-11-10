import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../bureger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'
import s from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIngredient } from '../../services/redusers/ingredients-reducer'

function App() {
  // используется для того, чтобы отобразить/убрать оверлей
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const currentIngredient = useSelector(state => state.ingredients.currentIngredient)
  const dispatch = useDispatch()

  const [isPopup, setIsPopup] = React.useState(false)
  const [modalType, setModalType] = React.useState('order')

  const togglePopup = (e) => {
    setIsPopup(!isPopup)

    if (e) {
      dispatch(setCurrentIngredient(ingredients.find(i => i._id === e.currentTarget.id)))
    }
  }

  const closeOnESC = (e) => {
    if (e.key === 'Escape') {
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

  return (
    <div>
      <AppHeader />
      {
          <div className={s.wrapper}>
            <div onClick={setModalIngredientType}>
              <BurgerIngredients handleClick={togglePopup}/>
            </div>
            <div onClick={setModalOrderType}>
              <BurgerConstructor handleClick={togglePopup}/>
            </div>
          </div>
      }

      {isPopup &&
        <Modal handleKeyPress={closeOnESC} handleCloseButtonClick={togglePopup} headerTitle={modalType === 'ingredient' && 'Детали ингредиента'} >
          {
            modalType === 'order'
              ? <OrderDetails />
              : <IngredientDetails data={currentIngredient}/>
          }
        </Modal>
      }
    </div>
  );
}

export default App;
