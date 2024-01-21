import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

const BurgerIngredients = () => {
    return (
        <div className={styles.root}>
            <h1 className='mt-10 mb-5'>Соберите бургер</h1>
            <div style={{ display: 'flex' }} className='mb-10'>
                <Tab value="one" active>
                    Булки
                </Tab>
                <Tab value="two">
                    Соусы
                </Tab>
                <Tab value="three">
                    Начинки
                </Tab>
            </div>
            <div className={styles.IngredientContainer} style={{ maxHeight: 600, overflowY: 'scroll'}}>
            {[['bun', 'Булки'], ['sauce', 'Соусы'], ['main', 'Начинки']].map(type => {
                return <section className={styles.tabSection}>
                    <h2 className={styles.tabSectionHeader}>{type[1]}</h2>
                    {data.filter(item => item.type === type[0]).map((ingredient) => {
                        return <div className={styles.Ingredient}>
                            <img src={ingredient.image_large} alt={ingredient.name} className={styles.IngredientImage} />
                            <p className={styles.price}><span style={{paddingRight: '8px'}}>{ingredient.price}</span><CurrencyIcon type="primary" /></p>
                            <p className={styles.name}>{ingredient.name}</p>
                        </div>;
                    })}
                </section>
            })}
            </div>
        </div>
    );
}


export default BurgerIngredients;