import s from './profile.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { ChangeEvent, FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getUserData, logOut, refreshUserData } from '../../services/actions/user-actions'

const Profile: FC = () => {
  const dispatch = useDispatch()

  const isLoaded = useSelector((state: any) => state.user.request)

  const userName = useSelector((state: any) => state.user.name)
  const userEmail = useSelector((state: any) => state.user.email)
  const userPass = useSelector((state: any) => state.user.password)

  const [form, setValue] = useState({ email: `${userEmail}`, name: `${userName}`, password: `${userPass}` })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const [isEdit, setIsEdit] = useState(false)
  const editIconHandler = () => setIsEdit(!isEdit)
  const onFocusHandler = () => setIsEdit(true)

  const logOutHandle = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(refreshUserData(form.email, form.name))

    setIsEdit(false)
  }

  const onCancelHandle = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    setValue({ email: `${userEmail}`, name: `${userName}`, password: `${userPass}` })
    setIsEdit(false)
  }

  const [path, setPath] = useState('/profile')
  const linkStyle = 'text text_type_main-medium text_color_inactive'
  return (
    <div className={`${s.wrapper} mt-15`}>
      <nav className={`${s.nav} mr-30`}>
        <div className={`${s.list} mb-20`}>
          <NavLink
            to='/profile'
            className={`${s.listItem} ${linkStyle}`}
            activeClassName={path === '/profile' ? `${s.active}` : ''}
            onClick={() => setPath('/profile')}
          >
            Профиль
          </NavLink>

          <NavLink
            to='/profile/orders'
            className={`${s.listItem} ${linkStyle}`}
            activeClassName={path === '/profile/orders' ? `${s.active}` : ''}
            onClick={() => setPath('/profile/orders')}
          >
            История заказов
          </NavLink>

          <div className={`${s.listItem} ${linkStyle}`} onClick={logOutHandle}>Выход</div>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе Вы можете изменить свои персональные данные
        </p>
      </nav>

      {isLoaded
        ? <div>Loading...</div>
        :
        <form className={s.form} onSubmit={onSubmitHandle}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            size={'default'}
            icon={'EditIcon'}
            onIconClick={editIconHandler}
            onFocus={onFocusHandler}
            onChange={onChange}
            value={form.name || ''}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            size={'default'}
            icon={'EditIcon'}
            onIconClick={editIconHandler}
            onFocus={onFocusHandler}
            onChange={onChange}
            value={form.email || ''}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            name={'password'}
            size={'default'}
            icon={'EditIcon'}
            onIconClick={editIconHandler}
            onFocus={onFocusHandler}
            onChange={onChange}
            value={form.password || ''}
          />

          {
            isEdit &&
            <div>
              <Button type="secondary" size="medium" onClick={onCancelHandle}>Отмена</Button>

              <Button type="primary" size="medium">Сохранить</Button>
            </div>
          }
        </form>
      }
    </div>
  )
}

export default Profile
