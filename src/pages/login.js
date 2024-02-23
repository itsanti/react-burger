import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
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
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
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
        <Button htmlType="submit" type="primary" size="medium" extraClass={styles.login} disabled={isButtonDisabled}>
          Войти
        </Button>
        <div>
          Вы — новый пользователь?{' '}
          <Link to={'/register'} className={`${styles.link} text text_type_main-default`}>
            Зарегистрироваться
          </Link>
          <br />
          Забыли пароль?{' '}
          <Link to={'/forgot-password'} className={`${styles.link} text text_type_main-default`}>
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
