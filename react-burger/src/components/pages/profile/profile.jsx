import s from './profile.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, logOut, refreshUserData } from '../../../services/actions/user-actions'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const isAuth = useSelector(state => state.user.isAuth)
  const isLoaded = useSelector(state => state.user.request)

  const userName = useSelector(state => state.user.name)
  const userEmail = useSelector(state => state.user.email)
  const userPass = useSelector(state => state.user.password)

  const [emailValue, setEmailValue] = React.useState('')
  const onEmailChange = e => setEmailValue(e.target.value)

  const [passValue, setPassValue] = React.useState('')
  const onPassChange = e => setPassValue(e.target.value)

  const [nameValue, setNameValue] = React.useState('')
  const onNameChange = e => setNameValue(e.target.value)

  const [isEdit, setIsEdit] = useState(false)
  const editIconHandler = () => setIsEdit(!isEdit)
  const onFocusHandler = () => setIsEdit(true)

  const logOutHandle = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  const onSubmitHandle = (e) => {
    e.preventDefault()

    dispatch(refreshUserData(userEmail, userName, userPass))

    setIsEdit(false)
    console.log('submited')
  }

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

      {isLoaded
        ? <div>Loading...</div>
        :
        <form className={s.form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            size={'default'}
            icon={'EditIcon'}
            value={nameValue}
            onIconClick={editIconHandler}
            onFocus={onFocusHandler}
            onChange={onNameChange}
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            name={'email'}
            size={'default'}
            icon={'EditIcon'}
            value={emailValue}
            onIconClick={editIconHandler}
            onFocus={onFocusHandler}
            onChange={onEmailChange}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            name={'password'}
            size={'default'}
            icon={'EditIcon'}
            value={passValue}
            onIconClick={editIconHandler}
            onFocus={onFocusHandler}
            onChange={onPassChange}
          />

          {
            isEdit &&
            <div>
              <Button type="secondary" size="medium">Отмена</Button>

              <Button type="primary" size="medium" onClick={onSubmitHandle}>Сохранить</Button>
            </div>
          }
        </form>
      }
    </div>
  )
}

export default Profile
