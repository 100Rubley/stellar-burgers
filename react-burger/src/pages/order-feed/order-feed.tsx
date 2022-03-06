import React, { useEffect } from "react"
import { wsConnectionStart } from "../../services/actions/ws-actions"
import { ensure, getIngredientById } from "../../utils/common"
import { useSelector, useDispatch } from "../../utils/hooks"
import Feed from "../../components/feed/feed"

const FeedContainer = () => {
  const dispatch = useDispatch()
  const wsOrders = useSelector(state => state.wsOrders)
  const total = wsOrders.total
  const totalToday = wsOrders.totalToday
  const ingredients = useSelector(state => state.ingredients.ingredients)

  const orders = wsOrders.orders.map(order => ({
    id: order.number,
    createdAt: order.createdAt,
    fullname: order.name,
    status: order.status,
    ingredients: order.ingredients.map(i => ensure(getIngredientById(ingredients, i)))
  }))

  const ordersDone = orders.filter(order => order.status === "done").map(order => order.id)
  const ordersPending = orders.filter(order => order.status === "pending").map(order => order.id)

  useEffect(() => {
    if (!wsOrders.wsConnected) {
      dispatch(wsConnectionStart())
    }
    // wsOrders.wsConnected не добавлен в зависимости, тк будет бесконечная перерисовка
    // тоже самое происходит, если совсем убрать все зависимости
  }, [dispatch])

  return (
    <>
      {
        !!orders
          ? <Feed orders={orders} total={total} totalToday={totalToday} ordersDone={ordersDone} ordersPending={ordersPending}/>
          : <div>Loading...</div>
      }
    </>
  )
}

export default FeedContainer
