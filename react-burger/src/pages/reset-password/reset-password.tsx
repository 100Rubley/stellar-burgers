import s from './reset-password.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { useDispatch } from '../../utils/hooks'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { savePassword } from '../../services/actions/user-actions'
import { TIcon } from '../../utils/types/types'

const ResetPassword: FC = () => {
  // redirect
  const history = useHistory()
  const location = useLocation<any>()
  const background = location.state && location.state.prevPath;

  if (background !== '/forgot-password') {
    history.goBack()
  }
  // --------

  const dispatch = useDispatch()

  const [icon, setIcon] = useState<TIcon>('HideIcon')
  const passInputType = icon === 'ShowIcon' ? 'text' : 'password'
  const inputPassRef = useRef<HTMLInputElement>(null!)

  const [form, setValue] = useState({ password: '', code: '' })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const passSave = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(savePassword(form.password, form.code))
    }, [dispatch, form]
  )

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={passSave}>
        <div className="text text_type_main-default mt-15">Восстановить пароль</div>

        <Input
          type={passInputType}
          placeholder={'Введите новый пароль'}
          name={'password'}
          size={'default'}
          icon={icon}
          ref={inputPassRef}
          onIconClick={onIconClick}
          value={form.password || ''}
          onChange={onChange}
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'name'}
          size={'default'}
          value={form.code || ''}
          onChange={onChange}
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
