import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import s from './app-header.module.css'

const AppHeader = () => {
  const linkStyle = 'text text_type_main-default text_color_inactive m-5'
  const [path, setPath] = useState('/')
  const location = useLocation()

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <NavLink to='/' className={`${linkStyle} ${s.container}`} activeClassName={path === '/' ? `${s.active}` : ''} onClick={() => setPath('/')}>
            <div className="mr-2">
              <BurgerIcon type={path === '/' ? 'primary' : 'secondary'} />
            </div>
              Конструктор
          </NavLink>

          <NavLink to='/order-feed' className={`${linkStyle} ${s.container}`} activeClassName={s.active} onClick={() => setPath('/order-feed')}>
            <div className="mr-2">
              <ListIcon type={path === '/order-feed' ? 'primary' : 'secondary'} />
            </div>
              Лента заказов
          </NavLink>
        </nav>

        <div className={s.logoWrapper}>
          <NavLink to='/'>
            <Logo />
          </NavLink>
        </div>

        <menu>
          <NavLink to={{ pathname: '/profile', state: { form: location } }}
            className={`${linkStyle} ${s.container}`}
            activeClassName={s.active}
            onClick={() => setPath('/profile')}
          >
            <div className="mr-2">
              <ProfileIcon type={path === '/profile' ? 'primary' : 'secondary'} />
            </div>
              Личный кабинет
          </NavLink>
        </menu>
      </div>
    </header>
  )
}

export default AppHeader
