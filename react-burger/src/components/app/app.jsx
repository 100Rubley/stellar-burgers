import React from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../bureger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { API_URL } from '../../utils/constants'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'
import s from './app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/redusers/ingredients-reducer'

function App() {
  // используется для того, чтобы отобразить/убрать оверлей
  const [isPopup, setIsPopup] = React.useState(false)
  const [modalType, setModalType] = React.useState('order')
  const [ingredientData, setIngredientData] = React.useState()

  // const togglePopup = (e) => {
  //   setIsPopup(!isPopup)

  //   if (e) {
  //     setIngredientData(data.filter(i => i._id === e.currentTarget.id))
  //   }
  // }

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
              {/* <BurgerIngredients handleClick={togglePopup} /> */}
              <BurgerIngredients />
            </div>
            <div onClick={setModalOrderType}>
              {/* <BurgerConstructor data={data} handleClick={togglePopup} /> */}
              <BurgerConstructor />
            </div>
          </div>
      }

      {isPopup &&
        // <Modal handleCloseButtonClick={togglePopup} handleKeyPress={closeOnESC} headerTitle={modalType === 'ingredient' && 'Детали ингредиента'} >
        <Modal handleKeyPress={closeOnESC} headerTitle={modalType === 'ingredient' && 'Детали ингредиента'} >
          {
            modalType === 'order'
              ? <OrderDetails />
              : <IngredientDetails data={ingredientData[0]} />
          }
        </Modal>
      }
    </div>
  );
}

export default App;
