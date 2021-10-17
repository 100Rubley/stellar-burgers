import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import s from './burger-ingredients.module.css'
import data from '../../utils/data'
import BurgerIngredient from './burger-ingredient/burger-ingredient.jsx'

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('Булки')

  return (
    <article className={s.wrapper}>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>

      <div style={{ display: 'flex' }} className='mt-5'>
        <Tab value="one" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'Совусы'} onClick={setCurrent}>
          Совусы
        </Tab>
        <Tab value="three" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <section className={`${s.scrollable} mt-10`}>
        <figure className={s.figure}>
          <p className="text text_type_main-medium">
            Булки
          </p>
          {data.filter(i => i.type === 'bun').map(i => (
            <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`}>
              <BurgerIngredient name={i.name} price={i.price} src={i.image} />
            </div>
            )
          )}
        </figure>

        <figure className={s.figure}>
          <p className="text text_type_main-medium">
            Совусы
          </p>
          {data.filter(i => i.type === 'sauce').map(i => (
            <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`}>
              <BurgerIngredient name={i.name} price={i.price} src={i.image} />
            </div>
            )
          )}
        </figure>

        <figure className={s.figure}>
          <p className="text text_type_main-medium">
            Начинки
          </p>
          {data.filter(i => i.type === 'main').map(i => (
            <div className={`${s.ingredientContainer} mt-6 ml-4 mb-10`}>
              <BurgerIngredient name={i.name} price={i.price} src={i.image} />
            </div>
            )
          )}
        </figure>
      </section>
    </article>
  )
}

export default BurgerIngredients
