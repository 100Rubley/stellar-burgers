import React from 'react'
import s from './ingredient-details.module.css'

const IngredientDetails = ({ data }) => {
  console.log(data)
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
