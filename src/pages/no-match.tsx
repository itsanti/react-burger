import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/config';
import styles from './no-match.module.css';

const NoMatch: FC = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Oops nothing to see here!</h2>
      <p className={styles.status}>404</p>
      <p>
        <Link className={styles.accent} to={ROUTES.index}>
          Go to the home page
        </Link>
      </p>
    </div>
  );
}

export default NoMatch;
