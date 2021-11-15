import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import s from './burger-ingredients.module.css'
import BurgerIngredient from './burger-ingredient/burger-ingredient.jsx'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const BurgerIngredients = ({ handleClick }) => {
  const [current, setCurrent] = React.useState('Булки')
  const bunRef = React.useRef()
  const sauceRef = React.useRef()
  const mainRef = React.useRef()
  const tabRef = React.useRef()

  const data = useSelector(state => state.ingredients.ingredients)
  const ingredientsRequest = useSelector(state => state.ingredients.ingredientsRequest)

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
          : <section className={`${s.scrollable} mt-10`} id = 'scroll' onScroll={checkActualTab}>
            <figure className={s.figure}>
              <p className="text text_type_main-medium" id='bun' ref={bunRef}>
                Булки
              </p>
              {data.filter(i => i.type === 'bun').map(i => (
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
              {data.filter(i => i.type === 'sauce').map(i => (
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
              {data.filter(i => i.type === 'main').map(i => (
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

BurgerIngredients.propTypes = {
  handleClick: PropTypes.func
}

export default BurgerIngredients
