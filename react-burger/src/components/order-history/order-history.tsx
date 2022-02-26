import s from './order-history.module.css'
import React, { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import { TOrderStatus, TServerOrder } from '../../utils/types/orders-types'
import { getIngredientById } from '../../utils/common'
import { useSelector } from '../../utils/hooks'
import FeedPageItem from './order-item'

interface IFeedPageProps {
  orders: ReadonlyArray<TServerOrder>;
  show: boolean;
  paramsId: number
}

const OrderHistory: FC<IFeedPageProps> = ({ show, paramsId, orders }) => {
  const order = orders && orders.length && orders.find((order: TServerOrder) => order.number === paramsId)
  const date = order && formatRelative(new Date(order.createdAt), new Date(), { locale: ru })
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const currentOrderIngredients = order && order.ingredients.map((i: string) => getIngredientById(ingredients, i))

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

  const ingredientsMap = new Map()

  currentOrderIngredients && currentOrderIngredients
    .map(i => {
      const current = i?._id

      if (!ingredientsMap.has(current)) {
        ingredientsMap.set(current, 1);
      } else {
        ingredientsMap.set(current, ingredientsMap.get(current) + 1);
      }
      return ingredientsMap
    })

  const uI: any = currentOrderIngredients && new Set(currentOrderIngredients)
  const uniqueIngredients = [...uI]

  return (
    <div className={s.wrapper}>
      {
        show
          ? <p className={`${s.id} text text_type_digits-default`}>
            #{paramsId}
          </p>
          : null
      }

      <p className='text text_type_main-medium mb-3'>
        {order && order.name}
      </p>

      <p className='text text_type_main-small mb-15'>
        {order && showStatus(order.status)}
      </p>

      <p className='text text_type_main-medium mb-6'>
        Состав:
      </p>

      <div className={`${s.scrollable} mb-10`}>
        {
          uniqueIngredients.map(
            (i, index) => {
              const amount = ingredientsMap.get(i?._id)
              return (
                i && <FeedPageItem img={i.image} name={i.name} type={i.type} price={i.price} key={index} amount={amount} />
              )
            }
          )
        }
      </div>
      <footer className={`mb-15 ${s.footer}`}>
        <span className='text text_type_main-default text_color_inactive'>
          {date}
        </span>
        <span className={`${s.icon} text text_type_digits-default`}>
          {currentOrderIngredients && currentOrderIngredients.reduce((sum: number, current: any) => sum + current.price, 0)}
          <CurrencyIcon type='primary' />
        </span>
      </footer>
    </div>
  )
}

export default OrderHistory
