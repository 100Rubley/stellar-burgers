import s from './profile.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, logOut } from '../../../services/actions/user-actions'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const userName = useSelector(state => state.user.name)
  const userEmail = useSelector(state => state.user.email)
  const userPass = useSelector(state => state.user.password)
  const history = useHistory()
  
  const logOutHandle = () => {
    dispatch(logOut())
  }
  
  const [isEdit, setIsEdit] = useState(false)
  const editIconHandler = () => setIsEdit(!isEdit)
  const onBlurHandler = () => setIsEdit(false)
  const onFocusHandler = () => setIsEdit(true)

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  // if (!isAuth) {
  //   history.replace({ pathname: '/login' })
  // }

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

      <form className={s.form}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          icon={'EditIcon'}
          value={userName}
          onIconClick={editIconHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          name={'email'}
          size={'default'}
          icon={'EditIcon'}
          value={userEmail}
          onIconClick={editIconHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          size={'default'}
          icon={'EditIcon'}
          value={userPass}
          onIconClick={editIconHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />

        {
          isEdit &&
          <div>
            <Button type="secondary" size="medium">Отмена</Button>

            <Button type="primary" size="medium">Сохранить</Button>
          </div>
        }
      </form>
    </div>
  )
}

export default Profile
