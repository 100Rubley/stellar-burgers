import s from './new-password.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback, useRef, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cancelResetSuccess, resetPassword } from '../../services/actions/user-actions'

const NewPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()

  const [icon, setIcon] = useState('ShowIcon')
  const [emailValue, setEmailValue] = useState('')

  const inputPassRef = useRef(null)
  const isResetSuccess = useSelector(state => state.user.resetPassSuccess)
  const isAuth = useSelector(state => state.user.isAuth)

  if (isResetSuccess) {
    history.replace({ pathname: '/reset-password' })
    dispatch(cancelResetSuccess())
  }

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  const resetRequset = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(resetPassword(emailValue))
    }, [emailValue, dispatch]
  )

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={resetRequset}>
        <div className="text text_type_main-default mt-15">Восстановление пароля</div>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={`${icon}`}
          ref={inputPassRef}
          onIconClick={onIconClick}
          onChange={onEmailChange}
          value={emailValue}
        />
        <Link to={{ pathname: 'reset-password', state: { prevPath: location.pathname } }}>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </Link>
      </form>

      <div className="text text_type_main-default mt-15 text_color_inactive">
        Вспомнили пароль?
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

export default NewPassword
