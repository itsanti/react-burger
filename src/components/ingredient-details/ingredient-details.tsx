import React, { FC, useEffect } from 'react';
import styles from './ingredient-details.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/selectors/ingredients';
import { useDispatch, useSelector } from '../../hooks';
import { setIngredient } from '../../services/actions/current-ingredient';
import { NoMatch } from '../../pages';
import { IngredientProps } from '../../utils/types/prop-types';

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients: IngredientProps[] = useSelector(selectIngredients);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const ingredient = ingredients.filter((ingredient) => ingredient._id === id).at(0);

  useEffect(() => {
    if (!ingredient) {
      return;
    }
    dispatch(setIngredient(ingredient));
  }, [ingredient, dispatch, navigate]);

  if (!ingredient) {
    return <NoMatch />;
  }

  return (
    <div data-testid="ingredientModal" className={styles.root}>
      {!location.state && <h2 className="text_type_main-large mt-30">Детали ингредиента</h2>}
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
