import React, { FC, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../../hooks';
import styles from './burger-constructor-element.module.css';
import { sortIngredients } from '../../../services/actions/burgconstructor';
import { BurgerConstructorElementProps, IngredientProps, ConstructorElementDnD } from '../../../utils/types/prop-types';

const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({ index, element, handleClose }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
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
      const dragIndex = (item as ConstructorElementDnD).index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = (ref.current as Element)?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      dispatch(sortIngredients(dragIndex, hoverIndex) as any);
      (item as ConstructorElementDnD).index = hoverIndex;
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
  const handleCloseElement = (element: IngredientProps) => {
    handleClose(element.type, element.uuid);
  };
  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId} style={{ opacity }} className={styles.root}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleCloseElement(element)}
      />
    </div>
  );
};

export default BurgerConstructorElement;
