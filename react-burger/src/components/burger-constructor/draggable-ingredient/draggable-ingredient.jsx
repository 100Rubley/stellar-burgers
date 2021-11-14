import s from './draggable-ingredient.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { moveIngredient, removeItem } from '../../../services/actions/constructor-actions'

const DraggableIngredient = ({ name, price, image, uniqueId }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()

  const [, drop] = useDrop({
    accept: 'constructor',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.uniqueId
      const hoverIndex = uniqueId
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(moveIngredient(dragIndex, hoverIndex))
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor',
    item: () => {
      return { uniqueId }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  drop(drag(ref))
  const opacity = isDragging ? 0 : 1

  return (
    <div className={s.constructorWrapper} ref={ref} style={{ opacity }} key={uniqueId}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch(removeItem(uniqueId))
        }}
      />
    </div>
  )
}

export default DraggableIngredient
