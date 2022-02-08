import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOrders } from "../../services/actions/orders-actions"
import { ensure } from "../../utils/common"
import { useSelector } from "../../utils/hooks"
import { IIngredient } from "../../utils/types/types"
import Feed from "./feed"

const FeedContainer = () => {
  const dispatch = useDispatch()
  const ordersFromServer = useSelector(state => state.orders.list)
  const total = useSelector(state => state.orders.total)
  const totalToday = useSelector(state => state.orders.totalToday)
  const ingredients = useSelector(state => state.ingredients.ingredients)

  const getIngredientById = (array: ReadonlyArray<IIngredient>, id: string) => array.find(i => i._id === id)

  const orders = ordersFromServer.map(order => ({
    id: order.number,
    createdAt: order.createdAt,
    fullname: order.name,
    status: order.status,
    ingredients: order.ingredients.map(i => ensure(getIngredientById(ingredients, i)))
  }))

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <>
      {
        !!orders
          ? <Feed orders={orders} total={total} totalToday={totalToday} />
          : <div>Loading...</div>
      }
    </>
  )
}

export default FeedContainer
