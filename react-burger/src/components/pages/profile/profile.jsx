import s from './profile.module.css'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../../services/actions/user-actions'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const history = useHistory()

  const logOutHandle = () => {
    dispatch(logOut())
  }

  if (!isAuth) {
    history.replace({ pathname: '/login' })
  }

  return (
    <div className={`${s.wrapper} mt-15`}>
      <nav className={`${s.nav} mr-30`}>
        <div className={`${s.list} mb-20`}>
          <div className="text text_type_main-medium">Профиль</div>
          <div className="text text_type_main-medium text_color_inactive">История заказов</div>
          <div className="text text_type_main-medium text_color_inactive" onClick={logOutHandle}>Выход</div>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе Вы можете изменить свои персональные данные
        </p>
      </nav>

      <div className={s.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
        />
        <Input
          type={'e-mail'}
          placeholder={'E-mail'}
          name={'e-mail'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
        />
      </div>
    </div>
  )
}

export default Profile
