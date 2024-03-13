import React, { FC, useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/actions/auth';
import { ROUTES } from '../utils/config';

const ResetPassword: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState({ isSet: false, msg: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { values, handleChange } = useForm({
    password: '',
    token: '',
  });

  const handleChangeWithError = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError({ isSet: false, msg: '' });
    handleChange(ev);
  };

  useEffect(() => {
    if (location.state?.from !== ROUTES.forgotPassword) {
      return navigate(ROUTES.forgotPassword);
    }
  });

  useEffect(() => {
    if (!(values.password && values.token)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(resetPassword(values) as any)
      .then((res: any) => {
        navigate(ROUTES.login, { replace: true });
      })
      .catch((err: any) => {
        setError({
          isSet: true,
          msg: err.message,
        });
      });
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
          value={values.password}
          name={'password'}
          error={false}
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size={'default'}
          extraClass="mt-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChangeWithError}
          value={values.token}
          name={'token'}
          error={error.isSet}
          errorText={error.msg}
          size={'default'}
          extraClass="mt-6"
        />
        <div className={styles.formFooter}>
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
            Сохранить
          </Button>
          <p>
            Вспомнили пароль?{' '}
            <Link to={ROUTES.login} className={styles.accent}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
