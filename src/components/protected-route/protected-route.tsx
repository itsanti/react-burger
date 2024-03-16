import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked, selectUser } from '../../services/selectors/auth';
import { ROUTES } from '../../utils/config';
import { ProtectedProps } from '../../utils/types/prop-types';

const Protected: FC<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
  // нужно делать checkUserAuth в <App/>
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Выводим прелоадер в APP
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: ROUTES.index } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.login} state={{ from: location }} />;
  }

  return component;
};

const OnlyUnAuth: FC<{ component: ReactElement }> = ({ component }) => <Protected onlyUnAuth={true} component={component} />;

export { Protected as OnlyAuth, OnlyUnAuth };
