import s from './login.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../services/actions/user-actions'

const Login = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const [passValue, setPassValue] = React.useState('')

  const [icon, setIcon] = React.useState('ShowIcon')

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const background = location.state && location.state.form;
  const isAuth = useSelector(state => state.user.isAuth)

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }
  const inputPassRef = React.useRef(null)
  const inputEmailRef = React.useRef(null)

  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  const onPassChange = e => {
    setPassValue(e.target.value)
  }

  const logInHandle = useCallback(
    e => {
      e.preventDefault()
      dispatch(logIn(emailValue, passValue))
    }, [emailValue, passValue, dispatch]
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
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          onChange={onEmailChange}
          ref={inputEmailRef}
          value={emailValue}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={`${icon}`}
          onChange={onPassChange}
          ref={inputPassRef}
          onIconClick={onIconClick}
          value={passValue}
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
