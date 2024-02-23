import React, { useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { SECTIONS } from '../../utils/config';
import { useSelector, useDispatch } from 'react-redux';
import { selectIngredients } from '../../services/selectors/ingredients';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { setIngredient } from '../../services/actions/current-ingredient';
import { Link, useLocation } from 'react-router-dom';

const BurgerIngredients = () => {
  const sections = [useRef(), useRef(), useRef()];
  const ingredients = useSelector(selectIngredients);
  let location = useLocation();

  const [activeTab, setActiveTab] = useState('bun');

  const dispatch = useDispatch();

  const setIngredientHandler = (ingredient) => {
    dispatch(setIngredient(ingredient));
  };

  const scrollToHandler = (sectionName) => {
    sections
      .filter((section) => section.current.dataset.type === sectionName)
      .at(0)
      .current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollHandler = (ev) => {
    const whoMap = {};
    for (let section of sections) {
      whoMap[Math.abs(ev.target.offsetTop - section.current.getBoundingClientRect().top)] = section;
    }
    const min = Math.min(...Object.keys(whoMap));
    setActiveTab(whoMap[min].current.dataset.type);
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.mainHeader + ' mt-10 mb-5'}>Соберите бургер</h1>
      <div className={styles.tabs + ' mb-10'}>
        <Tab value="bun" active={activeTab === 'bun'} onClick={scrollToHandler}>
          Булки
        </Tab>
        <Tab value="sauce" active={activeTab === 'sauce'} onClick={scrollToHandler}>
          Соусы
        </Tab>
        <Tab value="main" active={activeTab === 'main'} onClick={scrollToHandler}>
          Начинки
        </Tab>
      </div>
      <div onScroll={scrollHandler} className={styles.IngredientContainer}>
        {SECTIONS.map((type, ix) => {
          return (
            <section className={styles.tabSection} key={ix}>
              <h2 ref={sections[ix]} data-type={type[0]} className={styles.tabSectionHeader}>
                {type[1]}
              </h2>
              {ingredients
                .filter((item) => item.type === type[0])
                .map((ingredient, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/ingredients/${ingredient._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      state={{ backgroundLocation: location }}
                    >
                      <BurgerIngredient
                        current={index}
                        ingredient={ingredient}
                        setIngredientHandler={setIngredientHandler}
                      />
                    </Link>
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
