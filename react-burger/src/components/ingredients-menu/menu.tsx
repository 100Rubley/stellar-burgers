import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC, useRef, useState } from 'react'
import s from './menu.module.css'
import { useSelector } from '../../utils/hooks'
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { BUN, MAIN, SAUCE, TABS } from '../../utils/constants';
import { IIngredient } from '../../utils/types/types';

interface IBurgerIngredientsProps {
  handleClick: (id: string) => void
}

const BurgerIngredients: FC<IBurgerIngredientsProps> = ({ handleClick }) => {
  const data = useSelector((state) => state.ingredients.ingredients)
  const ingredientsRequest = useSelector((state) => state.ingredients.ingredientsRequest)

  const [current, setCurrent] = useState<typeof BUN | typeof SAUCE | typeof MAIN>(BUN)
  const bunRef = useRef<HTMLInputElement>(null!)
  const sauceRef = useRef<HTMLInputElement>(null!)
  const mainRef = useRef<HTMLInputElement>(null!)
  const tabRef = useRef<HTMLInputElement>(null!)


  const checkActualTab = () => {
    const tabsTop = tabRef.current.getBoundingClientRect().top;
    const bunsDistance = Math.abs(tabsTop - bunRef.current.getBoundingClientRect().top);
    const saucesDistance = Math.abs(tabsTop - sauceRef.current.getBoundingClientRect().top);
    const mainsDistance = Math.abs(tabsTop - mainRef.current.getBoundingClientRect().top);

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
        ingredientsRequest
          ? <div>Loading</div>
          : <section className={`${s.scrollable} mt-10`} id='scroll' onScroll={checkActualTab}>
            <figure className={s.figure}>
              <p className="text text_type_main-medium" id='bun' ref={bunRef}>
                Булки
              </p>
              {data.filter((i: IIngredient) => i.type === 'bun').map((i: IIngredient) => (
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
              {data.filter((i: IIngredient) => i.type === 'sauce').map((i: IIngredient) => (
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
              {data.filter((i: IIngredient) => i.type === 'main').map((i: IIngredient) => (
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
