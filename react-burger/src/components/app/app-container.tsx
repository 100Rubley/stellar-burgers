import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestIngredients } from '../../services/actions/ingredients-actions'
import { useLocation } from 'react-router-dom';
import App from './app'

const AppContainer: FC = () => {
  const dispatch = useDispatch()
  const { ingredients } = useSelector((state: any) => state.ingredients)
  const location = useLocation<any>()
  const background = location.state && location.state.background

  useEffect(() => {
    if (!ingredients.length) dispatch(requestIngredients())
  }, [dispatch, ingredients])

  return (
    <App location={location} background={background} />
  )
}

export default AppContainer
