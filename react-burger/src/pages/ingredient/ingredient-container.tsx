import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { setCurrentIngredient } from '../../services/actions/ingredients-actions';

const IngredientContainer = ({ ingredients }: any) => {
  const { ingredientId } = useParams<any>()
  const currentIngredient = ingredients.filter((i: any) => i._id === ingredientId)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentIngredient(currentIngredient))
  }
  ,[dispatch])
  console.log(currentIngredient)
  // const { currentIngredient } = useSelector

  return (
    <IngredientDetails data={currentIngredient[0]}/>
  )
}

export default IngredientContainer
