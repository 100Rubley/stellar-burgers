import React from 'react';
import s from './order-status-board.module.css'

const OrderStatusBoard = () => {
  return (
    <section className={s.wrapper}>
      <div className={s.order_status}>
        <div>
          <OrderList >
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>
            <div>2281337</div>

          </OrderList>
        </div>
        <div>
          <OrderList>
            1337228
                  </OrderList>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className="text text_type_digits-large">298</p>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">71</p>
      </div>
    </section>
  )
}

const OrderList = ({ children }: any) => (
  <>
    <p className={`text text_type_main-medium mb-6`}>Title: </p>
    <div className={s.scrollable}>
      {/* {children.map((id, index) => (<p className="text text_type_digits-default" style={{color}} key={index}>{id}</p>))} */}
      {children}
    </div>
  </>
);

export default OrderStatusBoard
