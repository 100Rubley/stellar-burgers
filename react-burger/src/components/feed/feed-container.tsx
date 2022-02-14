import React, { useEffect } from "react"
import { getOrders } from "../../services/actions/orders-actions"
import { ensure, getIngredientById } from "../../utils/common"
import { useSelector, useDispatch } from "../../utils/hooks"
import Feed from "./feed"

const FeedContainer = () => {
  const dispatch = useDispatch()
  const ordersFromServer = useSelector(state => state.orders.list)
  const total = useSelector(state => state.orders.total)
  const totalToday = useSelector(state => state.orders.totalToday)
  const ingredients = useSelector(state => state.ingredients.ingredients)

  const orders = ordersFromServer.map(order => ({
    id: order.number,
    createdAt: order.createdAt,
    fullname: order.name,
    status: order.status,
    ingredients: order.ingredients.map(i => ensure(getIngredientById(ingredients, i)))
  }))

  const ordersDone = orders.filter(order => order.status === "done").map(order => order.id)
  const ordersPending = orders.filter(order => order.status === "pending").map(order => order.id)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <>
      {
        !!orders
          ? <Feed orders={orders} total={total} totalToday={totalToday} ordersDone={ordersDone} ordersPending={ordersPending} />
          : <div>Loading...</div>
      }
    </>
  )
}

export default FeedContainer
