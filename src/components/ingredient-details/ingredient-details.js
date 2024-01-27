import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.root}>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
      <p className={styles.name}>{ingredient.name}</p>
      <ul className={styles.stat}>
        <li className={styles.statItem}>
          <span className={styles.term}>Калории, ккал</span>
          <span className={styles.value}>{ingredient.calories}</span>
        </li>
        <li className={styles.statItem}>
          <span className={styles.term}>Белки, г</span>
          <span className={styles.value}>{ingredient.proteins}</span>
        </li>
        <li className={styles.statItem}>
          <span className={styles.term}>Жиры, г</span>
          <span className={styles.value}>{ingredient.fat}</span>
        </li>
        <li className={styles.statItem}>
          <span className={styles.term}>Углеводы, г</span>
          <span className={styles.value}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};

export default IngredientDetails;
