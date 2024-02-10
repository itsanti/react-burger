import React, { useRef } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor-element.module.css';
import { sortIngredients } from '../../../services/actions/burgconstructor';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/prop-types';

const BurgerConstructorElement = ({ index, element, handleClose }) => {
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
      dispatch(sortIngredients(dragIndex, hoverIndex));
      item.index = hoverIndex;
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
  const handleCloseElement = (element) => {
    handleClose(element.type, element.uuid);
  };
  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId} style={{ opacity }} className={styles.root}>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => handleCloseElement(element)}
      />
    </div>
  );
};

BurgerConstructorElement.propTypes = {
  index: PropTypes.number.isRequired,
  element: ingredientPropTypes.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BurgerConstructorElement;
