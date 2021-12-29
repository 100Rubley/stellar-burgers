import s from './sign-up.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../../../services/actions/user-actions'

const SignUp = () => {
  const dispatch = useDispatch()

  const [nameValue, setNameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [passValue, setPassValue] = React.useState('')

  const [icon, setIcon] = React.useState('ShowIcon')

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const inputNameRef = React.useRef(null)
  const inputEmailRef = React.useRef(null)
  const inputPassRef = React.useRef(null)

  const onNameChange = e => {
    setNameValue(e.target.value)
  }

  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  const onPassChange = e => {
    setPassValue(e.target.value)
  }

  const signUpHandle = useCallback(
    e => {
      e.preventDefault()
      dispatch(signUp(emailValue, passValue, nameValue))
    }, [nameValue, emailValue, passValue]
  )

  return (
    <div className={s.wrapper}>
      <form className={s.form}>
        <div className="text text_type_main-default mt-15">Регистрация</div>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          onChange={onNameChange}
          ref={inputNameRef}
          value={nameValue}
        />
        <Input
          type={'e-mail'}
          placeholder={'E-mail'}
          name={'e-mail'}
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
        <Button type="primary" size="medium" onClick={signUpHandle}>
          Зарегистрироваться
        </Button>
      </form>

      <div className="text text_type_main-default mt-15 text_color_inactive">
        Уже зарегистрированы?
        <span>
          <Link to='/login'>
            <Button type="secondary" size="medium">
              Войти
          </Button>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default SignUp
