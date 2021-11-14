import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import DraggableIngredient from './draggable-ingredient/draggable-ingredient'

const BurgerConstructor = ({ handleClick }) => {
  const bun = useSelector(state => state.burgerConstructor?.bun)
  const ingredients = useSelector(state => state.burgerConstructor?.constructorIngredients)

  const isBun = !Object.keys(bun).length === false
  const isIngredients = !Object.keys(ingredients).length === false

  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
  }))

  return (
    <article className={`${s.wrapper} mt-25`} ref={drop}>

      {
        isBun
          ? <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className={s.bun}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>

            <section className={`${s.scrollable}`}>
              {
                isIngredients
                  ? ingredients?.map(i => (
                    <DraggableIngredient key={i.uniqueId} uniqueId={i.uniqueId} name={i.name} price={i.price} image={i.image} />
                  ))
                  // Заменить нижнюю заглушку
                  : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Добавьте начинку</div>
              }
              {}
            </section>

            <div className={s.bun}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          </div>
          // Заменить нижнюю заглушку
          : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Перетащите сюда булку</div>
      }

      {
        (isBun && isIngredients) &&
        <footer className={`${s.footer} mt-10`}>
          <span className={`${s.summary} mr-10 text text_type_main-large`}>
            {ingredients.reduce((sum, current) => sum + current.price, 0) + bun.price}
            <CurrencyIcon type="primary" />
          </span>
          <Button type="primary" size="large" onClick={handleClick}>
            Оформить заказ
        </Button>
        </footer>
      }
    </article>
  )
}

BurgerConstructor.propTypes = {
  handleClick: PropTypes.func
}

export default BurgerConstructor
