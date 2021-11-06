import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import s from './burger-ingredient.module.css'
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { addCurrentConstructorIngredient } from "../../../services/redusers/all-reducers";
import { useDispatch } from "react-redux";

const BurgerIngredient = ({ name, price, src, id }) => {
  const dispatch = useDispatch()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { name },
    end: (item, monitor) => {
      // это долженр обработать редьюсер и добавить этот ингредиент в список кунструктора
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(addCurrentConstructorIngredient(id));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    })
  }))

  return (
    <div className={s.wrapper} ref={drag}>
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
