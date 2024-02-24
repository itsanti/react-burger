import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { useDispatch } from 'react-redux';
import { authRegister, setUser } from '../services/actions/auth';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState({ isSet: false, msg: '' });
  const dispatch = useDispatch();

  const initialFormState = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',
    }),
    [],
  );

  const { values, handleChange } = useForm(initialFormState);

  const handleChangeWithError = (ev) => {
    setError({ isSet: false, msg: '' });
    handleChange(ev);
  };

  useEffect(() => {
    if (!(values.email && values.password && values.name)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(authRegister(values))
      .then((res) => {
        dispatch(setUser({ ...res.user, password: values.password }));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch((err) => {
        setError({
          isSet: true,
          msg: err.message,
        });
      });
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          size={'default'}
          extraClass="mt-6"
        />
        <EmailInput
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChangeWithError}
          value={values.email}
          name={'email'}
          error={error.isSet}
          errorText={error.msg}
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
          <Button disabled={isButtonDisabled} htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
            Зарегистрироваться
          </Button>
          <p>
            Уже зарегистрированы?{' '}
            <Link to="/login" className={styles.accent}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
