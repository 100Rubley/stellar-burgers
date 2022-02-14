import React, { FC } from 'react'
import { TIngredientType } from '../../utils/types/types'
import s from './feed-page.module.css'

interface IFeedPageItemProps {
  img: string;
  price: number;
  name: string;
  type: TIngredientType;
  amount: number
}

const FeedPageItem: FC<IFeedPageItemProps> = ({ img, price, name, type, amount }) => {
  amount = type === 'bun' ? 2 : amount
  return (
    <div className={`${s.itemWrapper} mb-4 mr-6`}>
      <div className={s.iconsWrapper}>
        <div className={s.imageWrapper}>
          <img className={s.ingredientImage} src={img} alt="no img" />
        </div>

      </div>

      <div className={`text text_type_main-default`}>
        {name}
      </div>

      <div className={`${s.price} ml-4 text text_type_digits-default`}>
        <div>
          {amount}
        </div>
        <div>x</div>
        <div>{price}</div>
      </div>

    </div>
  )
}

export default FeedPageItem
