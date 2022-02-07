import React from 'react'
import { ROUTES } from '../../utils/constants'
import s from './feed.module.css'
import OrderItem from './order-item/order-item'
import OrderStatusBoard from './order-status-board/order-status-board'

const Feed = () => {
  return (
    <div className={s.wrapper}>
      <section className={s.feed}>
        <div className='text text_type_main-medium'>
          {ROUTES.orders.title}
        </div>

        <div className={s.scrollable}>
          {/* тут надо будет мапиться по заказам, которые придут в пропсы */}
          <OrderItem />
          <OrderItem />
          <OrderItem />


        </div>

      </section>

      <section className={s.orders}>
        <OrderStatusBoard />
      </section>
    </div>
  )
}

export default Feed
