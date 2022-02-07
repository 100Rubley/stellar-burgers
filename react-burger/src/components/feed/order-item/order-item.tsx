import s from './order-item.module.css'
import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const OrderItem = () => {
  return (
    <div className={s.wrapper}>
      <p className={s.flex}>
        <span className="text text_type_main-medium">
          Тут будет id
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, вo столько-то
        </span>
      </p>

      <p className={`${s.full_name} text text_type_main-medium`}>
        FUUUUL Name
      </p>

      <br />

      <p className='text text_type_main-small'>Done</p>

      <p className={`${s.ingredients} ${s.flex}`}>
        <span>
          {/* тут мапимся по ингредиентам, которые есть в пропсах и рисуем картинки */}
          <img className={s.ingredientImage} src={""} alt="no img" />
          <img className={s.ingredientImage} src={""} alt="no img" />
          <img className={s.ingredientImage} src={""} alt="no img" />
          <img className={s.ingredientImage} src={""} alt="no img" />

        </span>

        <span>
          <span className="text text_type_main-medium">
            {2000}
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
