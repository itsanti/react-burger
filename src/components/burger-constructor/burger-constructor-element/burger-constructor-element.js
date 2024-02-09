import React, { useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor-element.module.css';

const BurgerConstructorElement = ({ index, element, handleClose }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'constructor-element',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
      console.log('dispatch', dragIndex, hoverIndex);
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-element',
    item: () => {
      return { id: element.uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId} style={{ opacity }} className={styles.root}>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => {
          handleClose(element.type, element.uuid);
        }}
      />
    </div>
  );
};

export default BurgerConstructorElement;
