import s from './reset-password.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { savePassword } from '../../services/actions/user-actions'

const ResetPassword = () => {
  // redirect
  const history = useHistory()
  const location = useLocation()
  const background = location.state && location.state.prevPath;
  
  if (background !== '/forgot-password') {
    history.goBack()
  }
  // --------

  const dispatch = useDispatch()

  const [icon, setIcon] = useState('ShowIcon')
  const [pass, setPass] = useState('')
  const [code, setCode] = useState('')
  const inputPassRef = useRef(null)

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const onPassChange = e => {
    setPass(e.target.value)
  }

  const onCodeChange = e => {
    setCode(e.target.value)
  }

  const passSave = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(savePassword(pass, code))
    }, [dispatch, pass, code]
  )

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={passSave}>
        <div className="text text_type_main-default mt-15">Восстановить пароль</div>

        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={`${icon}`}
          ref={inputPassRef}
          onIconClick={onIconClick}
          value={pass}
          onChange={onPassChange}
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          value={code}
          onChange={onCodeChange}
        />
        <Button type="primary" size="medium">
          Сохранить
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

export default ResetPassword
