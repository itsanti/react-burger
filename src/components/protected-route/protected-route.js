import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked, selectUser } from '../../services/selectors/auth';

const Protected = ({ onlyUnAuth = false, component }) => {
  // нужно делать checkUserAuth в <App/>
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Выводим прелоадер в APP
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;

export { Protected as OnlyAuth, OnlyUnAuth };
