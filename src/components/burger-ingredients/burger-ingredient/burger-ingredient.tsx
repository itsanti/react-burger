import React, { FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { dropIngredient } from '../../../services/actions/burgconstructor';
import { selectIngredientsCount } from '../../../services/selectors/burgconstructor';
import { setIngredient } from '../../../services/actions/current-ingredient';
import { BurgerIngredientProps, IngredientProps } from '../../../utils/types/prop-types';


const BurgerIngredient: FC<BurgerIngredientProps> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const countersMap: any = useSelector(selectIngredientsCount);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingredient',
    item: { id: ingredient._id, type: ingredient.type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(dropIngredient(ingredient));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const setIngredientHandler = (ingredient: IngredientProps) => {
    dispatch(setIngredient(ingredient));
  };

  const opacity = isDragging ? 0.2 : 1;

  return (
    <div style={{ opacity }} className={styles.Ingredient} onClick={() => setIngredientHandler(ingredient)}>
      {countersMap && countersMap[ingredient._id] && <Counter count={countersMap[ingredient._id]} size="default" />}
      <img ref={drag} src={ingredient.image_large} alt={ingredient.name} className={styles.IngredientImage} />
      <p className={styles.price}>
        <span>{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={styles.name}>{ingredient.name}</p>
    </div>
  );
};

export default BurgerIngredient;
