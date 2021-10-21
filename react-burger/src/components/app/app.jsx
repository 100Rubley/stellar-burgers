import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../bureger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { API_URL } from '../../utils/constants'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import IngredientDetails from '../ingredient-details/ingredient-details'
import s from './app.module.css'

function App() {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])
  // используется для того, чтобы отобразить/убрать оверлей
  const [isPopup, setIsPopup] = React.useState(false)
  const [modalType, setModalType] = React.useState('order')
  const [ingredientData, setIngredientData] = React.useState()

  const togglePopup = (e) => {
    setIsPopup(!isPopup)

    if (e) {
      setIngredientData(data.filter(i => i._id == e.currentTarget.id))
    }
    console.log(ingredientData)
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

  return (
    <div>
      <AppHeader />

      {
        data &&
        <div className={s.wrapper}>
          <div onClick={setModalIngredientType}>
            <BurgerIngredients data={data} handleClick={togglePopup} />
          </div>
          <div onClick={setModalOrderType}>
            <BurgerConstructor data={data} handleClick={togglePopup} />
          </div>
        </div>
      }

      {isPopup &&
        <Modal handleCloseButtonClick={togglePopup} handleKeyPress={closeOnESC}>
          {
            modalType === 'order'
              ? <OrderDetails />
              : <IngredientDetails data={ingredientData} />
          }
        </Modal>
      }
    </div>
  );
}

export default App;
