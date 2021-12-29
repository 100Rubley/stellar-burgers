import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <div className={`${s.container} m-5`}>
            <div className="mr-2">
              <BurgerIcon type="primary" />
            </div>
            <Link to='/'>
              <p className="text text_type_main-default">
                Конструктор
              </p>
            </Link>
          </div>

          <div className={`${s.container} m-5`}>
            <div className="mr-2">
              <ListIcon type="secondary" />
            </div>
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
          </p>
          </div>
        </nav>

        <div className={s.logoWrapper}>
          <Logo />
        </div>

        <menu>
          <div className={`${s.container} m-5`}>
            <div className="mr-2">
              <ProfileIcon type="secondary" />
            </div>
            <Link to='/profile'>
              <p className="text text_type_main-default text_color_inactive">
                Личный кабинет
              </p>
            </Link>
          </div>
        </menu>
      </div>
    </header>
  )
}

export default AppHeader
