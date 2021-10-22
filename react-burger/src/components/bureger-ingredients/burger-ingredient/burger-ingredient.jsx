import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import s from './burger-ingredient.module.css'
import PropTypes from 'prop-types';

const BurgerIngredient = ({ name, price, src }) => {
  return (
    <div className={s.wrapper}>
      <div className="mr-4 ml-4">
        <img src={src} alt="Фото ингредиента" />
      </div>

      <div className={`${s.price} text text_type_main-medium mt-1 mb-1`}>
        <span className='mr-2'>
          {price}
        </span>
        <CurrencyIcon type="primary" />
      </div>

      <div className={`${s.name} text text_type_main-default`}>
        {name}
      </div>
    </div>
  )
}

BurgerIngredient.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  src: PropTypes.string
}

export default BurgerIngredient
