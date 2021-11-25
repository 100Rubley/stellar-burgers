import s from './reset-password.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'

const ResetPassword = () => {
  const [icon, setIcon] = React.useState('ShowIcon')
  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const inputPassRef = React.useRef(null)
  return (
    <div className={s.wrapper}>
      <form className={s.form}>
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
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>

      <div className="text text_type_main-default mt-15 text_color_inactive">
        Вспомнили пароль?
        <span>
          <Button type="secondary" size="medium">
            Войти
          </Button>
        </span>
      </div>
    </div>
  )
}

export default ResetPassword
