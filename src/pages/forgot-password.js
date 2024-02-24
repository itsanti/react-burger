import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';

const ForgotPassword = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { values, handleChange } = useForm({
    email: '',
  });

  useEffect(() => {
    if (!values.email) {
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
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          error={false}
          size={'default'}
          extraClass="mt-6"
        />
        <div className={styles.formFooter}>
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
            Восстановить
          </Button>
          <p>
            Вспомнили пароль?{' '}
            <Link to={'/login'} className={styles.accent}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
