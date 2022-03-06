import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC, useRef, useState } from 'react'
import s from './menu.module.css'
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { BUN, MAIN, SAUCE, TABS } from '../../utils/constants';
import { IIngredient } from '../../utils/types/types';

interface IBurgerIngredientsProps {
  handleClick: (id: string) => void;
  buns: Array<IIngredient>;
  mains: Array<IIngredient>;
  sauces: Array<IIngredient>;
}

type TCurrent = typeof BUN | typeof SAUCE | typeof MAIN

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ handleClick, buns, sauces, mains }) => {
  const [current, setCurrent] = useState<TCurrent>(BUN)
  const bunRef = useRef<HTMLInputElement>(null!)
  const sauceRef = useRef<HTMLInputElement>(null!)
  const mainRef = useRef<HTMLInputElement>(null!)
  const tabRef = useRef<HTMLInputElement>(null!)

  const checkActualTab = () => {
    const tabsTop = tabRef.current.getBoundingClientRect().top;
    const bunsTop = bunRef.current.getBoundingClientRect().top;
    const sucesTop = sauceRef.current.getBoundingClientRect().top;
    const mainsTop = mainRef.current.getBoundingClientRect().top;

    const bunsDistance = Math.abs(tabsTop - bunsTop);
    const saucesDistance = Math.abs(tabsTop - sucesTop);
    const mainsDistance = Math.abs(tabsTop - mainsTop);

    const maxValue = Math.min(bunsDistance, saucesDistance, mainsDistance);

    if (maxValue === bunsDistance) {
      setCurrent(BUN);
    } else if (maxValue === saucesDistance) {
      setCurrent(SAUCE);
    } else {
      setCurrent(MAIN);
    }
  }

  const onTabClick = (e: any) => {
    setCurrent(e)
    e === BUN
      ? bunRef.current.scrollIntoView({ behavior: "smooth" })
      : e === MAIN
        ? mainRef.current.scrollIntoView({ behavior: "smooth" })
        : sauceRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <article className={s.wrapper}>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>

      <div style={{ display: 'flex' }} className='mt-5' ref={tabRef}>
        {
          TABS.map((tab: any) => (
            <Tab value={tab.type} key={tab.type} active={current === tab.type} onClick={onTabClick}>
              {tab.displayName}
            </Tab>
          ))
        }
      </div>

      {
        <section className={`${s.scrollable} mt-10`} id='scroll' onScroll={checkActualTab}>
          <figure className={s.figure}>
            <p className="text text_type_main-medium" id='bun' ref={bunRef}>
              Булки
              </p>
            {buns.map((i: IIngredient) => (
              <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`} onClick={() => { handleClick(i._id) }} key={i._id} id={i._id}>
                <BurgerIngredient ingredient={i} />
              </div>
            )
            )}
          </figure>

          <figure className={s.figure}>
            <p className="text text_type_main-medium" id='sauce' ref={sauceRef}>
              Соусы
              </p>
            {sauces.map((i: IIngredient) => (
              <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`} onClick={() => { handleClick(i._id) }} key={i._id} id={i._id} >
                <BurgerIngredient ingredient={i} />
              </div>
            )
            )}
          </figure>

          <figure className={s.figure}>
            <p className="text text_type_main-medium" id='main' ref={mainRef}>
              Начинки
              </p>
            {mains.map((i: IIngredient) => (
              <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`} onClick={() => { handleClick(i._id) }} key={i._id} id={i._id}>
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
