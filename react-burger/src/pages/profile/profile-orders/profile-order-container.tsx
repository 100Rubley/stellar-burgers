import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Modal from '../../../components/modal/modal'
import { wsConnectionStart } from '../../../services/actions/ws-actions'
import { useDispatch, useSelector } from '../../../utils/hooks'
import FeedPage from '../../feed/feed-page'

const ProfileOrderContainer = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const parsedId = parseInt(id, 10)
  const location = useLocation()
  const orders = useSelector(state => state.wsOrders.orders)
  
  useEffect(() => {
    if (!orders.length) dispatch(wsConnectionStart())    
  }, [dispatch, orders])

  if (!orders.length) return null

  return (
    <>
      {
        !location.key
          ? <FeedPage show={true} orders={orders} paramsId={parsedId} />
          : <Modal headerTitle={parsedId} from='/profile/orders'>
            <FeedPage show={false} orders={orders} paramsId={parsedId} />
          </Modal>
      }
    </>
  )
}

export default ProfileOrderContainer
