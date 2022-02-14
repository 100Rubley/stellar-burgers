import React, { FC, useEffect } from 'react'
import { useDispatch } from '../../utils/hooks'
import { useLocation, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';
import { setCurrentIngredient } from '../../services/actions/ingredients-actions';
import { IIngredient } from '../../utils/types/types';

interface IIngredientContainerProps {
  ingredients: ReadonlyArray<IIngredient>
}

const IngredientContainer: FC<IIngredientContainerProps> = ({ ingredients }) => {
  const { ingredientId } = useParams<{ ingredientId: string }>()
  const currentIngredient = ingredients.filter((i: IIngredient) => i._id === ingredientId)[0]
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (!currentIngredient) dispatch(setCurrentIngredient(currentIngredient))
  }, [dispatch, currentIngredient])

  return (
    <>
      {
        !location.key
          ? <IngredientDetails data={currentIngredient} />
          : <Modal headerTitle='Детали ингредиента' from='/'>
            <IngredientDetails data={currentIngredient} />
          </Modal>
      }
    </>
  )
}

export default IngredientContainer
