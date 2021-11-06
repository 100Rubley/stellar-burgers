import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';

const BurgerConstructor = ({ handleClick }) => {
  const ingredients = useSelector(state => state.burger.currentConstructorIngredients)
  const bun = useSelector(state => state.burger.currentBun)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  }))

  return (
    <article className={`${s.wrapper} mt-25`} ref={drop}>

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
                <div className={s.constructorWrapper} key={i._id}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={i.name}
                    price={i.price}
                    thumbnail={i.image}
                  />
                </div>
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
