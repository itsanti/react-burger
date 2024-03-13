import React, { FC } from 'react';
import styles from './profile.module.css';

import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../services/actions/auth';
import { ROUTES } from '../utils/config';

const Profile: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onLogout = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    dispatch(authLogout() as any);
  };

  const isIndex = location.pathname === ROUTES.profile.root;

  return (
    <div className={styles.root}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <NavLink to={ROUTES.profile.root} className={isIndex ? styles.active : styles.link}>
            Профиль
          </NavLink>
          <NavLink
            end
            to={ROUTES.profile.orders}
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            История заказов
          </NavLink>
          <Link to={ROUTES.logout} className={styles.link} onClick={onLogout}>
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
