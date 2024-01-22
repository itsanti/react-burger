import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement  } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

const BurgerConstructor = () => {
    const elementIds = [
        '60666c42cc7b410027a1a9b9',
        '60666c42cc7b410027a1a9b4',
        '60666c42cc7b410027a1a9bc',
        '60666c42cc7b410027a1a9bb',
        '60666c42cc7b410027a1a9bb',
    ];

    let totalPrice = 400;

    return (
        <div className={styles.root}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={data[0].image}
                />
                {elementIds.map((elementId, ix) => {
                    const [element] = data.filter(item => item._id === elementId);
                    totalPrice += element.price;
                    return <ConstructorElement
                        text={element.name}
                        price={element.price}
                        thumbnail={element.image}
                        key={ix}
                    />;
                })}
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={data[0].image}
                />
                <div className='mt-1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className={styles.totalPrice}><span>{totalPrice}</span><CurrencyIcon type="primary" /></div>
                    <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    );
}


export default BurgerConstructor;