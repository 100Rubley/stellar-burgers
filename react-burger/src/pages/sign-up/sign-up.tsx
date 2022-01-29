import s from './sign-up.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../services/actions/user-actions'
import { TIcon } from '../../utils/types'

const SignUp: FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: any) => state.user.isAuth)

  const [form, setValue] = useState({ email: ``, name: ``, password: `` })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const [icon, setIcon] = React.useState<TIcon>('HideIcon')
  const passInputType = icon === 'ShowIcon' ? 'text' : 'password'

  const inputPassRef = React.useRef<HTMLInputElement>(null!)

  const onIconClick = () => {
    setTimeout(() => inputPassRef.current.focus(), 0)
    icon === 'ShowIcon' ? setIcon('HideIcon') : setIcon('ShowIcon')
  }

  const signUpHandle = useCallback(
    e => {
      e.preventDefault()
      dispatch(signUp(form.email, form.password, form.name))
    }, [form, dispatch]
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
      <form className={s.form} onSubmit={signUpHandle}>
        <div className="text text_type_main-default mt-15">Регистрация</div>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          onChange={onChange}
          value={form.name || ''}
        />
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
          ref={inputPassRef}
          onIconClick={onIconClick}
          value={form.password || ''}
        />
        <Button type="primary" size="medium">
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
