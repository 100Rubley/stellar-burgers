import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './header-nav-item.module.css'

interface IHeaderNavItemProps {
  path: string
  text: string
  exact?: boolean
}

const HeaderNavItem: FC<IHeaderNavItemProps> = ({ path, exact, children, text }) => {
  return (
    <div className='pl-5'>
      <NavLink to={path} activeClassName={s.active} className={s.inactive} exact={exact ?? false}>
        {children}
        <span className={`text text_type_main-default ${s.navTitle} pl-2 pr-5`}>{text}</span>
      </NavLink>
    </div>
  )
}

export default HeaderNavItem
