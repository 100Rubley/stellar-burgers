import React, { FC } from 'react';
import s from './order-status-board.module.css'

interface IOrderStatusBoardProps {
  total: number;
  totalToday: number;
  ordersDone: ReadonlyArray<number>;
  ordersPending: ReadonlyArray<number>;
}

const OrderStatusBoard: FC<IOrderStatusBoardProps> = ({ ordersDone, ordersPending, total, totalToday }) => {
  return (
    <section className={s.wrapper}>
      <div className={s.order_status}>
        <div>
          <p className={`text text_type_main-medium mb-6`}>Готовы: </p>
          <div className={s.scrollable}>
            {
              !!ordersDone
                ? ordersDone.map(
                  (order, index) =>
                    <p className={`${s.done} text text_type_digits-default`} key={index}>
                      {order}
                    </p>)
                : null
            }
          </div>
        </div>
        <div>
          <p className={`text text_type_main-medium mb-6`}>В работе: </p>
          <div className={s.scrollable}>
            {
              !!ordersPending
                ? ordersPending.map(
                  (order, index) =>
                    <p className={`text text_type_digits-default`} key={index}>
                      {order}
                    </p>)
                : null
            }
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  )
}

export default OrderStatusBoard
