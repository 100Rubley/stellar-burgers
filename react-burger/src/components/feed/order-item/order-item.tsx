import s from './order-item.module.css'
import React, { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../../utils/types/types'
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useHistory } from 'react-router-dom'

interface IOrderItemProps {
  fullname: string;
  ingredients: ReadonlyArray<IIngredient>
  createdAt: string;
  id: number;
  status: string;
}

const OrderItem: FC<IOrderItemProps> = ({ fullname, ingredients, createdAt, id }) => {
  const history = useHistory()

  const date = formatRelative(new Date(createdAt), new Date(), { locale: ru })

  const onOrderItemClick = (id: number) => {
    history.replace({ pathname: `/feed/${id}` })
  }

  const uI: any = new Set(ingredients)
  const uniqueIngredients = [...uI]

  if (!ingredients) return null

  return (
    <div className={s.wrapper} onClick={() => onOrderItemClick(id)}>
      <p className={s.flex}>
        <span className="text text_type_digits-default">
          #{id}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {date}
        </span>
      </p>

      <p className={`${s.full_name} text text_type_main-medium mb-6 mt-6`}>
        {fullname}
      </p>

      <div className={`${s.footer} mb-2`}>
        <ul className={s.iconsWrapper}>
          {
            uniqueIngredients
              .filter((itemId: string, index: number) => index < 6)
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
              {ingredients.reduce((sum, current) => sum + current.price, 0)}
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

export default OrderItem
