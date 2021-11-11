import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {  useDrop } from 'react-dnd';
import DraggableIngredient from './draggable-ingredient/draggable-ingredient'

const BurgerConstructor = ({ handleClick }) => {
  const bun = useSelector(state => state.burgerConstructor?.bun)
  const ingredients = useSelector(state => state.burgerConstructor?.constructorIngredients)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  }))

  return (
    <article className={`${s.wrapper} mt-25`} ref={drop}>

      {/* 
      когда нет ни булки, ни ингредиента, отрисуй контейнер " перетащи сюда "
      когда есть булка, но нет ингредиента - отрисовать булки и контейнер " выбери начинку и соус "
      когда есть и булка и ингредиент, добавить кнопку "оформить заказ" с суммой 
      */}

      {
        bun
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
              {ingredients.map(i => (
                <DraggableIngredient key={i.uniqueId} uniqueId={i.uniqueId} name={i.name} price={i.price} image={i.image} />
              ))}
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
          : <div>Выберите булку </div>
      }

      <footer className={`${s.footer} mt-10`}>
        <span className={`${s.summary} mr-10 text text_type_main-large`}>
          {/* {data.reduce((sum, current) => sum + current.price, 0)} */}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleClick}>
          Оформить заказ
        </Button>
      </footer>
    </article>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  handleClick: PropTypes.func
}

export default BurgerConstructor
