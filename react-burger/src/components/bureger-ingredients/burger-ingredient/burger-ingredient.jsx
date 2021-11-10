import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React from "react"
import s from './burger-ingredient.module.css'
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { addToConstructor } from "../../../services/redusers/constructor-reducer";
import { useDispatch } from "react-redux";

const BurgerIngredient = ({ ingredient }) => {
  const generateUniqueId = () => {
    return (Date.now() + Math.random())
  }

  const dispatch = useDispatch()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { ingredient },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const generatedId = generateUniqueId()
        dispatch(addToConstructor({...ingredient, uniqueId: generatedId}));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }))

  return (
    <div className={s.wrapper} ref={drag}>
      <div className="mr-4 ml-4">
        <img src={ingredient.image} alt="Фото ингредиента" />
      </div>

      <div className={`${s.price} text text_type_main-medium mt-1 mb-1`}>
        <span className='mr-2'>
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>

      <div className={`${s.name} text text_type_main-default`}>
        {ingredient.name}
      </div>
    </div>
  )
}

BurgerIngredient.propTypes = {
  ingredient: PropTypes.object
}

export default BurgerIngredient
