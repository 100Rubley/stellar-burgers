import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './burger-constructor.module.css'
import { useSelector } from '../../utils/hooks'
import { useDrop } from 'react-dnd';
import DraggableIngredient from './draggable-ingredient/draggable-ingredient'
import { FC } from 'react';
import React from 'react';
import { IIngredient, IItem } from '../../utils/types/types';

interface IBurgerConstructor {
  handleRequest: (data: string[]) => void
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ handleRequest }) => {
  const bun = useSelector((state) => state.burgerConstructor?.bun)
  const ingredients = useSelector((state) => state.burgerConstructor?.constructorIngredients)

  const isBun = bun.price === 0 ? false : true
  const isIngredients = !Object.keys(ingredients).length === false

  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
  }))

  const requestData = [
    bun._id,
    ...ingredients.map((i: IIngredient) => i._id)
  ]

  return (
    <article className={`${s.wrapper} mt-25`} ref={drop} data-cy='dropTarget'>

      {
        isBun || isIngredients
          ?
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {
              isBun &&
              <div className={s.bun}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            }


            <section className={`${s.scrollable}`}>
              {
                isIngredients
                  ? ingredients?.map((i: IItem) => (
                    <DraggableIngredient key={i.uniqueId} uniqueId={i.uniqueId} name={i.name} price={i.price} image={i.image} />
                  ))
                  // Заменить нижнюю заглушку
                  : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Добавьте начинку</div>
              }
            </section>

            {
              isBun &&
              <div className={s.bun}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            }
          </div>
          // Заменить нижнюю заглушку
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Перетащите сюда булку</div>
      }

      {
        (isBun && isIngredients) &&
        <footer className={`${s.footer} mt-10`}>
          <span className={`${s.summary} mr-10 text text_type_main-large`}>
            {ingredients.reduce((sum: number, current: IIngredient) => sum + current.price, 0) + bun.price}
            <CurrencyIcon type="primary" />
          </span>
          <Button type="primary" size="large" onClick={() => { handleRequest(requestData) }}>
            Оформить заказ
          </Button>
        </footer>
      }
    </article>
  )
}

export default BurgerConstructor
