import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/bureger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { API_URL } from './utils/constants'
import Overlay from '../src/components/modal-overlay/modal-overlay'
import OrderDetails from './components/order-details/order-details'
import IngredientDetails from './components/ingredient-details/ingredient-details'

function App() {
  const [data, setData] = React.useState()

  // используется для того, чтобы отобразить/убрать оверлей
  const [isOverlay, setIsOverlay] = React.useState(false)
  const toggleOverlay = () => {
    setIsOverlay(!isOverlay)
  }

  const [modalType, setModalType] = React.useState('')

  const toggleIngredientsOverlay = () => {
    setIsOverlay(!isOverlay)
    setModalType('ingredients')
  }

  const toggleOrderOverlay = () => {
    setIsOverlay(!isOverlay)
    setModalType('order')
  }

  React.useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <AppHeader />

      {
        data &&
        <div className='wrapper'>
          <BurgerIngredients data={data} handleClick={toggleIngredientsOverlay}/>
          <BurgerConstructor data={data} handleClick={toggleOrderOverlay}/>
        </div>
      }

      {
        isOverlay &&
        <Overlay toggleOverlay={toggleOverlay}>
          {
            modalType === 'order'
            ? <OrderDetails />
            : <IngredientDetails />
          }
        </Overlay>
      }
    </div>
  );
}

export default App;
