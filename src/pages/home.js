import React from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.root}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};

export default Home;
