import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestIngredients } from '../../services/actions/ingredients-actions'
import App from './app'

const AppContainer: FC = () => {
  const dispatch = useDispatch()
  const { ingredients } = useSelector((state: any) => state.ingredients)

  useEffect(() => {
    if (!ingredients.length) dispatch(requestIngredients())
  }, [dispatch, ingredients.length])

  return (
    <App ingredients={ingredients} />
  )
}

export default AppContainer
