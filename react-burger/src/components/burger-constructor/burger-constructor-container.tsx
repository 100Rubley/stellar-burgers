import React, { FC } from 'react'
import { getBurgerConstructorState } from '../../services/selecors'
import { useSelector } from '../../utils/hooks'
import BurgerConstructor from './burger-constructor'

interface IBurgerConstructorContainerProps {
  handleRequest: (data: string[]) => void
}

const BurgerConstructorContainer: FC<IBurgerConstructorContainerProps> = ({ handleRequest }) => {
  const { bun, constructorIngredients } = useSelector(getBurgerConstructorState)

  return (
    <BurgerConstructor handleRequest={handleRequest} bun={bun} ingredients={constructorIngredients}/>
  )
}

export default BurgerConstructorContainer
