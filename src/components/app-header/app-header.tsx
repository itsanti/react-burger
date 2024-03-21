import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { selectUser } from '../../services/selectors/auth';
import { ROUTES } from '../../utils/config';

const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const profileText: string = (user && user.name) || 'Личный кабинет';
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.menu}>
            <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
              <NavLink to={ROUTES.index} className={({ isActive }) => (isActive ? styles.active : styles.link)}>
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
              <NavLink to={ROUTES.index}>
                <div className="mr-2">
                  <ListIcon type="secondary" />
                </div>
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to={ROUTES.index}>
          <Logo />
        </NavLink>
        <ul className={styles.menu}>
          <li className={styles.menuItem + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
            <NavLink to={ROUTES.profile.root} className={({ isActive }) => (isActive ? styles.active : styles.link)}>
              {({ isActive }) => (
                <>
                  <div className="mr-2">
                    <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                  </div>
                  {profileText}
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
