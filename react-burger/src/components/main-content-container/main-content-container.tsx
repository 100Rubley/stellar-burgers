import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { postOrder, showOrderModal } from '../../services/actions/constructor-actions'
import { hideIngredientsModal, removeCurrentIngredient, setCurrentIngredient, showIngredientsModal } from '../../services/actions/ingredients-actions'
import BurgerIngredients from "../bureger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import s from './main-content-container.module.css'

const MainContentContainer = () => {
  const { isAuth } = useSelector((state: any) => state.user)
  const orderId = useSelector((state: any) => state.burgerConstructor.order)
  const { currentIngredient } = useSelector((state: any) => state.ingredients)
  const isOrderModal = useSelector((state: any) => state.burgerConstructor.isModal)
  const isIngredientsModal = useSelector((state: any) => state.ingredients.isModal)
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleOrderRequest = (data: string[]) => {
    if (!isAuth) {
      history.replace({ pathname: '/login', state: { from: location } })
    } else {
      dispatch(postOrder(data))
      dispatch(showOrderModal())
    }
  }

  const onIngredientClick = (isOpen: boolean, ingredient: any) => {
    if (isOpen) {
      dispatch(hideIngredientsModal())
      dispatch(removeCurrentIngredient())
    } else {
      dispatch(showIngredientsModal())
      dispatch(setCurrentIngredient(ingredient))
    }
  }

  return (
    <div className={s.wrapper}>
      <BurgerIngredients handleClick={onIngredientClick} />
      <BurgerConstructor handleRequest={handleOrderRequest} />
      {
        isOrderModal
          ? <Modal>
            <OrderDetails orderId={orderId} />
          </Modal>
          : isIngredientsModal
            ? <Modal headerTitle='Детали ингредиента'>
              <IngredientDetails data={currentIngredient} />
            </Modal>
            : null
      }

    </div>
  )
}

export default MainContentContainer
