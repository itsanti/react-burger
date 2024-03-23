import React, { FC, useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch } from '../hooks';
import { authLogin, setUser } from '../services/actions/auth';
import { ROUTES } from '../utils/config';
import { LoginPayload } from '../services/actions/auth';

const Login: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState({ isSet: false, msg: '' });
  const dispatch = useDispatch();

  const { values, handleChange } = useForm<LoginPayload>({
    email: '',
    password: '',
  });

  const handleChangeWithError = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError({ isSet: false, msg: '' });
    handleChange(ev);
  };

  useEffect(() => {
    if (!(values.email && values.password)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(authLogin(values) as any)
      .then((res: any) => {
        dispatch(setUser({ ...res.user, password: values.password }) as any);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
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
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          placeholder={'E-mail'}
          onChange={handleChangeWithError}
          value={values.email}
          name={'email'}
          size={'default'}
          extraClass="mt-6"
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={handleChangeWithError}
          icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
          value={values.password || ''}
          name={'password'}
          error={error.isSet}
          errorText={error.msg}
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size={'default'}
          extraClass="mt-6"
        />
        <div className={styles.formFooter}>
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
            Войти
          </Button>
          <p>
            Вы — новый пользователь?{' '}
            <Link to={ROUTES.register} className={styles.accent}>
              Зарегистрироваться
            </Link>
          </p>
          <p>
            Забыли пароль?{' '}
            <Link to={ROUTES.forgotPassword} className={styles.accent}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
