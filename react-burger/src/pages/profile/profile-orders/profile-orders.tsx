import React, { useEffect, useState } from 'react'
import s from './profile-orders.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from '../../../utils/hooks'
import { logOut } from '../../../services/actions/user-actions'
import { wsConnectionStart } from '../../../services/actions/ws-actions'
import UserOrderItem from '../order-item/order-item'

const ProfileOrders = () => {
  const linkStyle = 'text text_type_main-medium text_color_inactive'
  const [path, setPath] = useState('/profile/orders')
  const wsOrders = useSelector(state => state.wsOrders)
  const dispatch = useDispatch()
  const logOutHandle = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    if (!wsOrders.wsConnected) {
      dispatch(wsConnectionStart())
    }
  }, [dispatch])

  return (
    <div className={s.wrapper}>
      <nav className={`${s.nav} mr-30`}>
        <div className={`${s.list} mb-20`}>
          <NavLink
            to='/profile'
            className={`${s.listItem} ${linkStyle}`}
            activeClassName={path === '/profile' ? `${s.active}` : ''}
            onClick={() => setPath('/profile')}
          >
            Профиль
          </NavLink>

          <NavLink
            to='/profile/orders'
            className={`${s.listItem} ${linkStyle}`}
            activeClassName={path === '/profile/orders' ? `${s.active}` : ''}
            onClick={() => setPath('/profile/orders')}
          >
            История заказов
          </NavLink>

          <div className={`${s.listItem} ${linkStyle}`} onClick={logOutHandle}>Выход</div>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе Вы можете посмотреть историю своих заказов
        </p>
      </nav>

      <div className={s.scrollable}>
        {
          !!wsOrders.orders.length && wsOrders.orders.map((i, index) => 
            // console.log(i)
            <UserOrderItem {...i} key={index}/>
            )
        }
      </div>
    </div>

  )
}

export default ProfileOrders
