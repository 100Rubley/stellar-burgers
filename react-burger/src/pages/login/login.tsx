import s from './login.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../services/actions/user-actions'

export interface ILocation {
  pathname: string
  state: {}
  from: string
}

export interface IIput {
  name: string
  value: string
}

export type TIcon = 'CurrencyIcon' | 'BurgerIcon' | 'LockIcon' | 'DragIcon' | 'CloseIcon' | 'CheckMarkIcon' | 'ListIcon' | 'ProfileIcon' |
  'EditIcon' | 'InfoIcon' | 'ShowIcon' | 'HideIcon' | 'LogoutIcon' | 'DeleteIcon' | 'ArrowUpIcon' | 'ArrowDownIcon' | 'MenuIcon' | undefined

const Login: FC = () => {
  const [form, setValue] = useState({ email: '', password: '' })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const [icon, setIcon] = useState<TIcon>('HideIcon')

  const dispatch = useDispatch()
  const location = useLocation<ILocation>()
  const background: any = location.state && location.state.from;
  const isAuth = useSelector((state: any) => state.user.isAuth)
  const inputPassRef = useRef<HTMLInputElement>(null!)

  const passInputType = icon === 'ShowIcon' ? 'text' : 'password'

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const logInHandle = useCallback(
    e => {
      e.preventDefault()
      dispatch(logIn(form.email, form.password))
    }, [form, dispatch]
  )

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: `${background.pathname}`
        }}
      />
    );
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={logInHandle}>
        <div className="text text_type_main-default mt-15">Вход</div>

        <Input
          type={'email'}
          placeholder={'E-mail'}
          name={'email'}
          size={'default'}
          onChange={onChange}
          value={form.email || ''}
        />
        <Input
          type={passInputType}
          placeholder={'Пароль'}
          name={'password'}
          size={'default'}
          icon={icon}
          onChange={onChange}
          onIconClick={onIconClick}
          ref={inputPassRef}
          value={form.password || ''}
        />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className="text text_type_main-default mt-15 text_color_inactive">
        Вы - новый пользователь?
        <span>
          <Link to='/register'>
            <Button type="secondary" size="medium">
              Зарегистрироваться
          </Button>
          </Link>
        </span>
      </div>

      <div className="text text_type_main-default mt-4 text_color_inactive">
        Забыли пароль?
        <span>
          <Link to='/forgot-password'>
            <Button type="secondary" size="medium">
              Восстановить пароль
          </Button>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Login