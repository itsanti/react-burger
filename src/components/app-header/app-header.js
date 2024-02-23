import React from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
                {({ isActive }) => (
                  <>
                    <div className="mr-2">
                      <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                    </div>
                    Конструктор
                  </>
                )}
              </NavLink>
            </li>
            <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
              <NavLink to="/">
                <div className="mr-2">
                  <ListIcon type="secondary" />
                </div>
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <ul className={styles.menu}>
          <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
              {({ isActive }) => (
                <>
                  <div className="mr-2">
                    <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  </div>
                  Личный кабинет
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default AppHeader;
