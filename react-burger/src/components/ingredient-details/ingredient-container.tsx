import React, { FC, useEffect } from 'react'
import { useDispatch } from '../../utils/hooks'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import IngredientDetails from '../../pages/ingredient/indredient-details';
import Modal from '../modal/modal';
import { hideIngredientsModal, removeCurrentIngredient, setCurrentIngredient } from '../../services/actions/ingredients-actions';
import { IIngredient } from '../../utils/types/types';

interface IIngredientContainerProps {
  ingredients: ReadonlyArray<IIngredient>
}

const IngredientContainer: FC<IIngredientContainerProps> = ({ ingredients }) => {
  const { ingredientId } = useParams<{ ingredientId: string }>()
  const currentIngredient = ingredients.filter((i: IIngredient) => i._id === ingredientId)[0]
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (!currentIngredient) dispatch(setCurrentIngredient(currentIngredient))
  }, [dispatch, currentIngredient])

  const closeModal = (from: string) => {
    dispatch(hideIngredientsModal())
    dispatch(removeCurrentIngredient())
    
    history.replace({ pathname: from })
  }

  return (
    <>
      {
        !location.key
          ? <IngredientDetails data={currentIngredient} />
          : <Modal headerTitle='Детали ингредиента' from='/' handleClose={closeModal}>
            <IngredientDetails data={currentIngredient} />
          </Modal>
      }
    </>
  )
}

export default IngredientContainer
