import React, { FC, useMemo } from 'react'
import { useSelector } from '../../utils/hooks'
import BurgerIngredients from './menu'
import { getIngredientsState } from '../../services/selecors'
import { IIngredient } from '../../utils/types/types'
import { BUN, MAIN, SAUCE } from '../../utils/constants'

interface IMenuContainerProps {
  handleClick: (id: string) => void;
}

const MenuContainer: FC<IMenuContainerProps> = ({ handleClick }) => {
  const { ingredients } = useSelector(getIngredientsState)

  const buns = useMemo(
    () => ingredients.filter((i: IIngredient) => i.type === BUN),
    [ingredients]
  )

  const mains = useMemo(
    () => ingredients.filter((i: IIngredient) => i.type === MAIN),
    [ingredients]
  )

  const sauces = useMemo(
    () => ingredients.filter((i: IIngredient) => i.type === SAUCE),
    [ingredients]
  )

  return (
    <BurgerIngredients handleClick={handleClick} sauces={sauces} buns={buns} mains={mains} />
  )
}

export default MenuContainer
