import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({ data }) => {
  const SECTIONS = [
    ['bun', 'Булки'],
    ['sauce', 'Соусы'],
    ['main', 'Начинки'],
  ];
  const SHOW_INDEX_ON = [0, 3];

  return (
    <div className={styles.root}>
      <h1 className={styles.mainHeader + ' mt-10 mb-5'}>Соберите бургер</h1>
      <div className={styles.tabs + ' mb-10'}>
        <Tab value="one" active>
          Булки
        </Tab>
        <Tab value="two">Соусы</Tab>
        <Tab value="three">Начинки</Tab>
      </div>
      <div className={styles.IngredientContainer}>
        {SECTIONS.map((type, ix) => {
          return (
            <section className={styles.tabSection} key={ix}>
              <h2 className={styles.tabSectionHeader}>{type[1]}</h2>
              {data
                .filter((item) => item.type === type[0])
                .map((ingredient, index) => {
                  return (
                    <div className={styles.Ingredient} key={index}>
                      {SHOW_INDEX_ON.includes(index) && <Counter count={1} size="default" />}
                      <img src={ingredient.image_large} alt={ingredient.name} className={styles.IngredientImage} />
                      <p className={styles.price}>
                        <span>{ingredient.price}</span>
                        <CurrencyIcon type="primary" />
                      </p>
                      <p className={styles.name}>{ingredient.name}</p>
                    </div>
                  );
                })}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default BurgerIngredients;
