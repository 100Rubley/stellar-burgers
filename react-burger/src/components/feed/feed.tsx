import React, { FC } from 'react'
import { ROUTES } from '../../utils/constants'
import { IOrder } from '../../utils/types/orders-types'
import s from './feed.module.css'
import OrderItem from './order-item/order-item'
import OrderStatusBoard from './order-status-board/order-status-board'

interface IFeedProps {
  orders: ReadonlyArray<IOrder>;
  total: number;
  totalToday: number;
}

const Feed: FC<IFeedProps> = ({ orders, total, totalToday }) => {

  return (
    <div className={s.wrapper}>
      <section className={s.feed}>
        <div className='text text_type_main-medium'>
          {ROUTES.orders.title}
        </div>

        <div className={s.scrollable}>
          {orders &&
            orders.map(order =>
              <OrderItem key={order.id}
                {...order}
              />
            )
          }
        </div>
      </section>

      <section className={s.orders}>
        <OrderStatusBoard />
      </section>
    </div>
  )
}

export default Feed