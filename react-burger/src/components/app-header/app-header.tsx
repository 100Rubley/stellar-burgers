import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import s from './app-header.module.css'
import HeaderNavItem from './app-nav-item/header-nav-item'
import { ROUTES } from '../../utils/constants'

const AppHeader: FC = () => {
  const { pathname } = useLocation()

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <HeaderNavItem text={ROUTES.home.title} path={ROUTES.home.path} exact={true}>
            <BurgerIcon type={pathname === ROUTES.home.path ? 'primary' : 'secondary'} />
          </HeaderNavItem>

          <HeaderNavItem text={ROUTES.orders.title} path={ROUTES.orders.path} >
            <ListIcon type={pathname === ROUTES.orders.path ? 'primary' : 'secondary'} />
          </HeaderNavItem>
        </nav>

        <div className={s.logoWrapper}>
          <NavLink to={ROUTES.home.path}>
            <Logo />
          </NavLink>
        </div>

        <menu>
          <HeaderNavItem text={ROUTES.profile.title} path={ROUTES.profile.path} >
            <ProfileIcon type={pathname === ROUTES.profile.path ? 'primary' : 'secondary'} />
          </HeaderNavItem>
        </menu>
      </div>
    </header>
  )
}

export default AppHeader
