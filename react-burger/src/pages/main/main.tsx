import React from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { postOrder, showOrderModal } from '../../services/actions/constructor-actions'
import { getBurgerConstructorState } from "../../services/selecors"
import MenuContainer from "../../components/ingredients-menu/menu-container"
import BurgerConstructorContainer from "../../components/burger-constructor/burger-constructor-container"
import s from './main-content-container.module.css'
import Modal from '../../components/modal/modal'
import OrderDetails from '../order/order-details'
import Preloader from '../loading/preloader'
import { getUserState } from '../../services/selecors'

const MainContentContainer = () => {
  const { isAuth } = useSelector(getUserState)
  const { order, isModal, orderRequest } = useSelector(getBurgerConstructorState)
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
    history.replace({ pathname: `/ingredients/${id}` })
  }

  return (
    <div className={s.wrapper}>
      <MenuContainer handleClick={onIngredientClick} />
      <BurgerConstructorContainer handleRequest={handleOrderRequest} />
      {
        orderRequest
          ? <Modal from='/'>
            <Preloader />
          </Modal>
          : isModal &&
          <Modal from='/'>
            <OrderDetails orderId={order} />
          </Modal>
      }

    </div>
  )
}

export default MainContentContainer
