import React from 'react';
import styles from './profile.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();

  const onLogout = (ev) => {
    ev.preventDefault();
    console.log('logout');
  };

  const isIndex = location.pathname === '/profile';

  return (
    <div className={styles.root}>
      <div className={styles.navContainer}>
        <NavLink to="/profile" className={isIndex ? styles.active : styles.link}>
          Профиль
        </NavLink>
        <NavLink end to="orders" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          История заказов
        </NavLink>
        <Link to={'/logout'} className={styles.link} onClick={onLogout}>
          Выход
        </Link>
        {isIndex && <p className={styles.help}>В этом разделе вы можете изменить свои персональные данные</p>}
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
