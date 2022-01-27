import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { FC } from "react"
import s from './burger-ingredient.module.css'
import { useDrag } from "react-dnd";
import { addToConstructor } from "../../../services/actions/constructor-actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

interface IBurgerIngredientProps {
  ingredient: IIngredient
}

export interface IIngredient {
  _id: string
  name: string
  type: string
  proteins: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile?: string
  image_large?: string
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredient }) => {
  const dispatch = useDispatch()
  const location = useLocation()

  const ingredientId = ingredient._id

  const bunAmount = useSelector((state: any) => state.burgerConstructor.bunMap?.get(ingredientId))
  const ingredientAmount = useSelector((state: any) => state.burgerConstructor.ingredientsMap?.get(ingredientId))

  const amount = ingredient.type === 'bun'
    ? bunAmount
    : ingredientAmount

  const generateUniqueId = () => {
    return (Date.now() + Math.random())
  }

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { ingredient },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        const generatedId = generateUniqueId()
        dispatch(addToConstructor({ ...ingredient, uniqueId: generatedId }));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }))

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location }
      }}
      className={s.link}
    >
      <div className={s.wrapper} ref={drag}>
        <div className='mr-4 ml-4'>
          <div className={s.counter}>
            <img src={ingredient.image} alt="Фото ингредиента" />
            {
              !!amount && <Counter count={ingredient.type === 'bun' ? 2 : amount} size="default" />
            }
          </div>
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
    </Link>
  )
}

export default BurgerIngredient