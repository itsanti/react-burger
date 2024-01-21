import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <nav>
                    <ul className={styles.menu}>
                        <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}><div className='mr-2'><BurgerIcon type="primary" /></div>Конструктор</li>
                        <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}><div className='mr-2'><ListIcon type="secondary" /></div>Лента заказов</li>
                    </ul>
                </nav>
                <Logo />
                <ul className={styles.menu}>
                    <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}><div className='mr-2'><ProfileIcon type="secondary" /></div>Личный кабинет</li>
                </ul>
            </header>
        </div>
    );
}


export default AppHeader;