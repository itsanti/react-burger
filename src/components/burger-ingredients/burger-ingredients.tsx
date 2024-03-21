import React, { FC, UIEvent, useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { SECTIONS } from '../../utils/config';
import { useSelector } from '../../hooks';
import { selectIngredients } from '../../services/selectors/ingredients';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/config';

const BurgerIngredients: FC = () => {
  const sections = [useRef<HTMLHeadingElement>(), useRef<HTMLHeadingElement>(), useRef<HTMLHeadingElement>()];
  const ingredients = useSelector(selectIngredients);
  let location = useLocation();

  const [activeTab, setActiveTab] = useState<string>('bun');

  const scrollToHandler = (sectionName: string) => {
    const section = sections
      .filter((section) => section && section.current?.dataset.type === sectionName);
    if (section.length) {
      section[0].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollHandler = (ev: UIEvent) => {
    const whoMap: { [key: number]: typeof sections[0] } = {};
    for (let section of sections) {
      whoMap[Math.abs((ev.target as HTMLElement).offsetTop - (section.current as Element).getBoundingClientRect().top)] = section;
    }
    const min = Math.min(...Object.keys(whoMap).map(parseFloat));
    if (whoMap[min].current?.dataset.type) {
      setActiveTab(whoMap[min].current?.dataset.type as string);
    }
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
              <h2 ref={sections[ix] as React.RefObject<HTMLHeadingElement>} data-type={type[0]} className={styles.tabSectionHeader}>
                {type[1]}
              </h2>
              {ingredients
                .filter((item) => item.type === type[0])
                .map((ingredient, index) => {
                  return (
                    <Link
                      key={index}
                      to={`${ROUTES.ingredients}/${ingredient._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      state={{ backgroundLocation: location }}
                    >
                      <BurgerIngredient
                        ingredient={ingredient}
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
