import s from './feed-page.module.css'
import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const FeedPage = () => {
  return (
    <div className={s.wrapper}>
      <p className={`${s.id} text text_type_digits-default`}>
        # tut budet ID
      </p>

      <p className='text text_type_main-medium mb-3'>
        Nazvanie
      </p>

      <p className='text text_type_main-small mb-15'>
        Status
      </p>

      <p  className='text text_type_main-medium'>
        Sostav:
      </p>

      <div className={`${s.scrollable} mb-10`}>

      </div>
      <footer className={s.footer}>
        <span className='text text_type_main-default text_color_inactive'>
          date
          </span>
        <span className={`${s.icon} text text_type_digits-default`}>
          price 
          <CurrencyIcon type='primary' />
        </span>
      </footer>
    </div>
  )
}

export default FeedPage
