import React from 'react';
import styles from './profile.module.css';

import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../services/actions/auth';

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onLogout = (ev) => {
    ev.preventDefault();
    dispatch(authLogout());
  };

  const isIndex = location.pathname === '/profile';

  return (
    <div className={styles.root}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <NavLink to="/profile" className={isIndex ? styles.active : styles.link}>
            Профиль
          </NavLink>
          <NavLink end to="orders" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            История заказов
          </NavLink>
          <Link to={'/logout'} className={styles.link} onClick={onLogout}>
            Выход
          </Link>
        </nav>
        {isIndex && (
          <p className={styles.help}>
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </p>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
