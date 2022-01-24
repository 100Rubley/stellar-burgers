import React, { FC, useEffect } from 'react'
import s from './ingredient-details.module.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIngredient } from '../../services/actions/ingredients-actions';
import { IIngredient } from '../bureger-ingredients/burger-ingredient/burger-ingredient';


const IngredientDetails: FC = () => {
  const dispatch = useDispatch()
  const { ingredientId } = useParams<{ ingredientId: string }>()
  const ingredients = useSelector((state: any) => state.ingredients.ingredients)
  const data = useSelector((state: any) => state.ingredients?.currentIngredient)
  const current = ingredients.find((i: IIngredient) => i._id === ingredientId)
  useEffect(() => {
    dispatch(setCurrentIngredient(current))
  }, [dispatch, current])

  return (
    <div className={s.wrapper}>
      <div>
        <img src={data.image_large} alt="Ingredient" />
      </div>
      <p className="text text_type_main-medium mt-4">{data.name}</p>

      <div className={`${s.detailsContainer} mt-4 mb-15`}>
        <div className={s.details}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
        </div>

        <div className={s.details}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
        </div>

        <div className={s.details}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
        </div>

        <div className={s.details}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails
