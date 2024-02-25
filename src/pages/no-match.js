import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/config';

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to={ROUTES.index}>Go to the home page</Link>
      </p>
    </div>
  );
}

export default NoMatch;
