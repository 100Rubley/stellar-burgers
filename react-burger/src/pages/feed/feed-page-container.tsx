import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Modal from '../../components/modal/modal'
import { requestIngredients } from '../../services/actions/ingredients-actions'
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/ws-actions'
import { useDispatch, useSelector } from '../../utils/hooks'
import FeedPage from './feed-page'

const FeedPageContainer = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const parsedId = parseInt(id, 10)
  const orders = useSelector(state => state.wsOrders.orders)
  const ingredients = useSelector(state => state.ingredients.ingredients)
  const location = useLocation()

  useEffect(() => {
    if (!orders.length) dispatch(wsConnectionStart())
    if (!ingredients.length) dispatch(requestIngredients())

    return (() => {
      dispatch(wsConnectionClosed())
    })
  }, [dispatch, orders, ingredients])

  return (
    <>
      {
        !location.key
          ? <FeedPage show={true} orders={orders} paramsId={parsedId} />
          : <Modal headerTitle={parsedId} from='/feed'>
            <FeedPage show={false} orders={orders} paramsId={parsedId} />
          </Modal>
      }
    </>
  )
}

export default FeedPageContainer
