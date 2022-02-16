import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { getIngredientById } from '../../../utils/common'
import { useSelector } from '../../../utils/hooks'
import { TOrderStatus, TServerOrder } from '../../../utils/types/orders-types'
import s from './order-item.module.css'

const UserOrderItem: FC<TServerOrder> = ({ createdAt, number, name, ingredients, status }) => {
  const date = formatRelative(new Date(createdAt), new Date(), { locale: ru })
  const stateIngredients = useSelector(state => state.ingredients.ingredients)
  const orderIngredients = ingredients.map(i => getIngredientById(stateIngredients, i))
  const uI: any = new Set(orderIngredients)
  const uniqueIngredients = [...uI]

  const history = useHistory()
  const showStatus = (status: TOrderStatus) => {
    switch (status) {
      case 'done':
        return 'Выполнен'
      case 'created':
        return 'Приготовлен'
      case 'cancelled':
        return 'Отменен'
      case 'pending':
        return 'Ожидание'

      default:
        break;
    }
  }

  const onOrderItemClick = (id: number) => {
    history.replace({ pathname: `/profile/orders/${id}` })
  }

  return (
    <div className={s.wrapper} onClick={() => onOrderItemClick(number)}>
      <p className={`${s.flex} mb-6`}>
        <span className="text text_type_digits-default">
          #{number}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {date}
        </span>
      </p>

      <p className={`${s.full_name} text text_type_main-medium mb-2`}>
        {name}
      </p>

      <p className="text text_type_main-default mb-6">
        {showStatus(status)}
      </p>

      <div className={`${s.footer} mb-6`}>
        <ul className={s.iconsWrapper}>
          {
            uniqueIngredients
              .filter((itemId, index: number) => index < 6)
              .map((i, index) => {
                const rest = ingredients ? (ingredients?.length - 6) : 0

                return (
                  <li className={s.imageWrapper} key={index}>
                    <img className={s.ingredientImage} src={i?.image} alt="no img" />
                    {index === 5 && <span className={s.count}>+{rest}</span>}
                  </li>
                )
              }
              )
          }
        </ul>

        <span className={s.icon_and_price}>
          <div className={s.icon_and_priceWrapper}>
            <span className="text text_type_digits-default">
              {orderIngredients.reduce((sum, current: any) => sum + current.price, 0)}
            </span>
            <span className={s.icon}>
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </span>
      </div>


    </div>
  )
}

export default UserOrderItem
