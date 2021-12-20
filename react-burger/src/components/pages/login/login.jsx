import s from './login.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [icon, setIcon] = React.useState('ShowIcon')
  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }
  const inputPassRef = React.useRef(null)

  return (
    <div className={s.wrapper}>
      <form className={s.form}>
        <div className="text text_type_main-default mt-15">Вход</div>

        <Input
          type={'e-mail'}
          placeholder={'E-mail'}
          name={'e-mail'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        // onChange={onEmailChange}
        // ref={inputEmailRef}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={`${icon}`}
          // onChange={onPassChange}
          ref={inputPassRef}
          onIconClick={onIconClick}
        />
        <Button type="primary" size="medium">
          Зарегистрироваться
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
