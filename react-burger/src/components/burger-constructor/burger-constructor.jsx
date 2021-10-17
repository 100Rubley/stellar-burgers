import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './burger-constructor.module.css'

const BurgerConstructor = ({ data, handleClick }) => {
  const ingredients = data.filter(i => i.type !== 'bun')
  const bun = data.filter(i => i.name == 'Краторная булка N-200i')[0]

  return (
    <article className={`${s.wrapper} mt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={bun.price}
          thumbnail={bun.image}
        />

        <section className={`${s.scrollable}`}>
          {ingredients.map(i => <ConstructorElement
            text={i.name}
            price={i.price}
            thumbnail={i.image}
          />)}
        </section>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <footer className={`${s.footer} mt-10`}>
        <span className={`${s.summary} mr-10 text text_type_main-large`}>
          {data.reduce((sum, current) => sum + current.price, 0)}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleClick}>
          Оформить заказ
        </Button>
      </footer>
    </article>
  )
}

export default BurgerConstructor
