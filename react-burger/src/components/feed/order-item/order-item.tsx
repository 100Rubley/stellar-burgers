import s from './order-item.module.css'
import React, { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../../utils/types/types'
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'

interface IOrderItemProps {
  fullname: string;
  ingredients: ReadonlyArray<IIngredient>
  createdAt: string;
  id: number;
  status: string;
}

const OrderItem: FC<IOrderItemProps> = ({ fullname, ingredients, createdAt, id }) => {
  if (!ingredients) return null

  const date = formatRelative(new Date(createdAt), new Date(), { locale: ru })
  const generateUniqueId = () => {
    return (Date.now() + Math.random())
  }

  return (
    <div className={s.wrapper}>
      <p className={s.flex}>
        <span className="text text_type_digits-default">
          #{id}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {date}
        </span>
      </p>

      <p className={`${s.full_name} text text_type_main-medium`}>
        {fullname}
      </p>

      <p className={`${s.footer}`}>
        <ul className={s.iconsWrapper}>
          {
            ingredients.map(i =>
              <li className={s.imageWrapper}>
                <img className={s.ingredientImage} src={i?.image} alt="no img" key={generateUniqueId()} />
              </li>
            )
          }
        </ul>

        <span className={s.icon_and_price}>
          <div className={s.icon_and_priceWrapper}>
            <span className="text text_type_digits-default">
              {ingredients.reduce((sum, current) => sum + current.price, 0)}
            </span>
            <span className={s.icon}>
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </span>
      </p>
    </div>
  )
}

export default OrderItem
