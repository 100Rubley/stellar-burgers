import s from './feed-page.module.css'
import React, { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import { TOrderStatus, TServerOrder } from '../../utils/types/orders-types'
import { getIngredientById } from '../../utils/common'
import { useSelector } from '../../utils/hooks'
import FeedPageItem from './feed-page-item'

interface IFeedPageProps {
  orders: ReadonlyArray<TServerOrder>;
  show: boolean;
  paramsId: number
}

const FeedPage: FC<IFeedPageProps> = ({ show, paramsId, orders }) => {
  // пожалуйста, не смотрите на эти костыли, у меня паника -_-

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
          currentOrderIngredients && currentOrderIngredients.map(
            (i, index) =>
              (
                i && <FeedPageItem img={i.image} name={i.name} type={i.type} price={i.price} key={index} />
              )
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

export default FeedPage
