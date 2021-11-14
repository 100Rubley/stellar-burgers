import React from 'react'
import s from './order-details.module.css'
import orderCheck from '../../images/orderCheck.svg'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
  const orderNumber = useSelector(state => state.burgerConstructor.order)

  return (    
      <div className={s.wrapper}>
        <h2 className="text text_type_digits-large">{!!orderNumber && orderNumber}</h2>
        <p className="text text_type_main-medium mt-8 mb-15">Идентификатор заказа</p>
        <img src={orderCheck} alt="check"/>
        <p className="text text_type_main-default mt-15 mb-8">Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбительной станции</p>
      </div>    
  )
}

export default OrderDetails
