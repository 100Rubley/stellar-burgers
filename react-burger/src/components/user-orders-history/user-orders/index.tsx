import React, { useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Modal from '../../modal/modal'
import { wsConnectionStart } from '../../../services/actions/ws-actions'
import { useDispatch, useSelector } from '../../../utils/hooks'
import OrderHistory from '../../order-history/order-history'
import { hideOrderModal } from '../../../services/actions/constructor-actions'

const ProfileOrderContainer = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const parsedId = parseInt(id, 10)
  const location = useLocation()
  const orders = useSelector(state => state.wsOrders.orders)
  const history = useHistory()
  
  useEffect(() => {
    if (!orders.length) dispatch(wsConnectionStart())    
  }, [dispatch, orders])

  if (!orders.length) return null

  const closeModal = (from: string) => {
    dispatch(hideOrderModal())
    
    history.replace({ pathname: from })
  }

  return (
    <>
      {
        !location.key
          ? <OrderHistory show={true} orders={orders} paramsId={parsedId} />
          : <Modal headerTitle={parsedId} from='/profile/orders' handleClose={closeModal}>
            <OrderHistory show={false} orders={orders} paramsId={parsedId} />
          </Modal>
      }
    </>
  )
}

export default ProfileOrderContainer
