import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC, useRef, useState } from 'react'
import s from './burger-ingredients.module.css'
import { useSelector } from 'react-redux';
import BurgerIngredient, { IIngredient } from './burger-ingredient/burger-ingredient';

interface IBurgerIngredientsProps {
  // не понимаю как надо типизировать handleClick, подскажите
  handleClick: any
}

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ handleClick }) => {
  // string
  const [current, setCurrent] = useState('Булки')

  const bunRef = useRef<HTMLInputElement>(null!)
  const sauceRef = useRef<HTMLInputElement>(null!)
  const mainRef = useRef<HTMLInputElement>(null!)
  const tabRef = useRef<HTMLInputElement>(null!)

  const data = useSelector((state: any) => state.ingredients.ingredients)
  const ingredientsRequest = useSelector((state: any) => state.ingredients.ingredientsRequest)

  const checkActualTab = () => {
    const tabsTop = tabRef.current.getBoundingClientRect().top;
    const bunsDistance = Math.abs(tabsTop - bunRef.current.getBoundingClientRect().top);
    const saucesDistance = Math.abs(tabsTop - sauceRef.current.getBoundingClientRect().top);
    const mainsDistance = Math.abs(tabsTop - mainRef.current.getBoundingClientRect().top);

    const maxValue = Math.min(bunsDistance, saucesDistance, mainsDistance);

    if (maxValue === bunsDistance) {
      setCurrent('Булки');
    } else if (maxValue === saucesDistance) {
      setCurrent('Соусы');
    } else {
      setCurrent('Начинки');
    }
  }

  return (
    <article className={s.wrapper}>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>

      <div style={{ display: 'flex' }} className='mt-5' ref={tabRef}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      {
        ingredientsRequest
          ? <div>Loading</div>
          : <section className={`${s.scrollable} mt-10`} id='scroll' onScroll={checkActualTab}>
            <figure className={s.figure}>
              <p className="text text_type_main-medium" id='bun' ref={bunRef}>
                Булки
              </p>
              {data.filter((i: IIngredient) => i.type === 'bun').map((i: IIngredient) => (
                <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`} onClick={handleClick} key={i._id} id={i._id}>
                  <BurgerIngredient ingredient={i} />
                </div>
              )
              )}
            </figure>

            <figure className={s.figure}>
              <p className="text text_type_main-medium" id='sauce' ref={sauceRef}>
                Соусы
              </p>
              {data.filter((i: IIngredient) => i.type === 'sauce').map((i: IIngredient) => (
                <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`} onClick={handleClick} key={i._id} id={i._id}>
                  <BurgerIngredient ingredient={i} />
                </div>
              )
              )}
            </figure>

            <figure className={s.figure}>
              <p className="text text_type_main-medium" id='main' ref={mainRef}>
                Начинки
              </p>
              {data.filter((i: IIngredient) => i.type === 'main').map((i: IIngredient) => (
                <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`} onClick={handleClick} key={i._id} id={i._id}>
                  <BurgerIngredient ingredient={i} />
                </div>
              )
              )}
            </figure>
          </section>
      }
    </article>
  )
}

export default BurgerIngredients
