import s from './new-password.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback, useRef, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, cancelResetSuccess } from '../../../services/actions/user-actions'

const NewPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()

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
      <form className={s.form}>
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
        <Button type="primary" size="medium" onClick={resetRequset}>
          Восстановить
        </Button>
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
