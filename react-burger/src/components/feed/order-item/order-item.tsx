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

  return (
    <div className={s.wrapper}>
      <p className={s.flex}>
        <span className="text text_type_main-medium">
          #{id}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {date}
        </span>
      </p>

      <p className={`${s.full_name} text text_type_main-medium`}>
        {fullname}
      </p>

      <p className={`${s.ingredients} ${s.flex}`}>
        <span>
          {
            ingredients.map(i =>
              <img className={s.ingredientImage} src={i?.image_mobile} alt="no img" />
            )
          }

        </span>

        <span>
          <span className="text text_type_main-medium">
            {ingredients.reduce((sum, current) => sum + current.price, 0)}
          </span>
          <span className={s.icon}>
            <CurrencyIcon type="primary" />
          </span>
        </span>
      </p>
    </div>
  )
}

export default OrderItem
