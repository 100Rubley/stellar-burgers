import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';
import { setCurrentIngredient } from '../../services/actions/ingredients-actions';

const IngredientContainer = ({ ingredients }: any) => {
  const { ingredientId } = useParams<any>()
  const currentIngredient = ingredients.filter((i: any) => i._id === ingredientId)[0]
  const dispatch = useDispatch()
  const location = useLocation<any>()

  useEffect(() => {
    if (!currentIngredient) dispatch(setCurrentIngredient(currentIngredient))
  }, [dispatch, currentIngredient])

  return (
    <>
      {
        !location.key 
          ? <IngredientDetails data={currentIngredient} />
          : <Modal headerTitle='Детали ингредиента'>
            <IngredientDetails data={currentIngredient} />
          </Modal>

      }
    </>
  )
}

export default IngredientContainer
