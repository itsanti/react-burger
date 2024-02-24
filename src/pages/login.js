import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!(values.email && values.password)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(values);
    // dispatch(handleLogin(formValue.email, formValue.password));
    // navigate('/', {replace: true});
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          error={false}
          size={'default'}
          extraClass="mt-6"
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
          value={values.password}
          name={'password'}
          error={false}
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
            <Link to={'/register'} className={styles.accent} extraClass="mb-4">
              Зарегистрироваться
            </Link>
          </p>
          <p>
            Забыли пароль?{' '}
            <Link to={'/forgot-password'} className={styles.accent}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
