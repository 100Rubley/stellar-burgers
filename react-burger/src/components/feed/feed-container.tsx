import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getOrders } from "../../services/actions/orders-actions"
import { useSelector } from "../../utils/hooks"
import Feed from "./feed"

const FeedContainer = () => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.orders.list)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  return (
    <Feed />
  )
}

export default FeedContainer
