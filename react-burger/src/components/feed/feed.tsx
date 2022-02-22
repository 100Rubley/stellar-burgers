import React, { FC, useEffect } from 'react'
import { wsConnectionClosed } from '../../services/actions/ws-actions'
import { ROUTES } from '../../utils/constants'
import { useDispatch } from '../../utils/hooks'
import { IOrder } from '../../utils/types/orders-types'
import s from './feed.module.css'
import OrderItem from './order-item/order-item'
import OrderStatusBoard from './order-status-board/order-status-board'

interface IFeedProps {
  orders: ReadonlyArray<IOrder>;
  total: number;
  totalToday: number;
  ordersDone: ReadonlyArray<number>;
  ordersPending: ReadonlyArray<number>;
}

const Feed: FC<IFeedProps> = ({ orders, total, totalToday, ordersDone, ordersPending }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    return (() => {
      dispatch(wsConnectionClosed())
    })
  })

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
        <OrderStatusBoard ordersDone={ordersDone} ordersPending={ordersPending} total={total} totalToday={totalToday} />
      </section>
    </div>
  )
}

export default Feed
