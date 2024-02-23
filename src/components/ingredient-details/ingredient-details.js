import React, { useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/selectors/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { setIngredient } from '../../services/actions/current-ingredient';

const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  const ingredient = ingredients.filter((ingredient) => ingredient._id === id).at(0);

  useEffect(() => {
    if (!ingredient) {
      return;
    }
    dispatch(setIngredient(ingredient));
  }, [id, ingredient, dispatch]);

  if (!ingredient) {
    return null;
  }

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

export default IngredientDetails;
