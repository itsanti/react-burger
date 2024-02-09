import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { SHOW_INDEX_ON } from '../../../utils/config';
import styles from './burger-ingredient.module.css';

const BurgerIngredient = ({ ingredient, setIngredientHandler, current }) => {
  return (
    <div className={styles.Ingredient} onClick={() => setIngredientHandler(ingredient)}>
      {SHOW_INDEX_ON.includes(current) && <Counter count={1} size="default" />}
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.IngredientImage} />
      <p className={styles.price}>
        <span>{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={styles.name}>{ingredient.name}</p>
    </div>
  );
};
export default BurgerIngredient;
