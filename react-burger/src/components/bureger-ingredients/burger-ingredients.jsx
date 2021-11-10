import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import s from './burger-ingredients.module.css'
import BurgerIngredient from './burger-ingredient/burger-ingredient.jsx'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { requestIngredients } from '../../services/redusers/ingredients-reducer';
import { API_URL } from '../../utils/constants';

const BurgerIngredients = ({ handleClick }) => {
  const [current, setCurrent] = React.useState('Булки')

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(requestIngredients(API_URL));
  }, [dispatch]);

  const data = useSelector(state => state.ingredients.ingredients)
  const ingredientsRequest = useSelector(state => state.ingredients.ingredientsRequest)


  return (
    <article className={s.wrapper}>
      <p className="text text_type_main-large mt-10">
        Соберите бургер
      </p>

      <div style={{ display: 'flex' }} className='mt-5'>
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
          : <section className={`${s.scrollable} mt-10`}>
            <figure className={s.figure}>
              <p className="text text_type_main-medium">
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
              <p className="text text_type_main-medium">
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
              <p className="text text_type_main-medium">
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
