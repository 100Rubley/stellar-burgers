import React, { FC, useEffect } from 'react'
import { requestIngredients } from '../../services/actions/ingredients-actions'
import App from './app'
import { useDispatch, useSelector } from '../../utils/hooks'

const AppContainer: FC = () => {
  const dispatch = useDispatch()
  const { ingredients } = useSelector((state) => state.ingredients)

  useEffect(() => {
    if (!ingredients.length) dispatch(requestIngredients())
  }, [dispatch, ingredients.length])

  return (
    <App ingredients={ingredients} />
  )
}

export default AppContainer
