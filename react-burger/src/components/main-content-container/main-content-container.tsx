import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { postOrder, showOrderModal } from '../../services/actions/constructor-actions'
import BurgerIngredients from "../bureger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import s from './main-content-container.module.css'

const MainContentContainer = () => {
  const { isAuth } = useSelector((state: any) => state.user)
  const orderId = useSelector((state: any) => state.burgerConstructor.order)
  const isOrderModal = useSelector((state: any) => state.burgerConstructor.isModal)
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

  const onIngredientClick = (id: any) => {
    history.replace({pathname: `/ingredients/${id}`})
  }

  return (
    <div className={s.wrapper}>
      <BurgerIngredients handleClick={onIngredientClick} />
      <BurgerConstructor handleRequest={handleOrderRequest} />
      {
        isOrderModal
          && <Modal>
            <OrderDetails orderId={orderId} />
          </Modal>
      }

    </div>
  )
}

export default MainContentContainer
