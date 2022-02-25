import React from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { postOrder, showOrderModal } from '../../services/actions/constructor-actions'
import BurgerIngredients from "../../components/ingredients-menu/menu"
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"
import s from './main-content-container.module.css'
import Modal from '../../components/modal/modal'
import OrderDetails from '../order/order-details'

const MainContentContainer = () => {
  const { isAuth } = useSelector((state) => state.user)
  const orderId = useSelector((state) => state.burgerConstructor.order)
  const isOrderModal = useSelector((state) => state.burgerConstructor.isModal)
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

  const onIngredientClick = (id: string) => {
    history.replace({pathname: `/ingredients/${id}`})
  }

  return (
    <div className={s.wrapper}>
      <BurgerIngredients handleClick={onIngredientClick} />
      <BurgerConstructor handleRequest={handleOrderRequest} />
      {
        !!orderId && isOrderModal
          && <Modal from='/'>
            <OrderDetails orderId={orderId} />
          </Modal>
      }

    </div>
  )
}

export default MainContentContainer
