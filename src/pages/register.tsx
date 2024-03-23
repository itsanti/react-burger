import React, { FC, useState, useEffect, useMemo } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { useDispatch } from '../hooks';
import { authRegister } from '../services/actions/auth';
import { ROUTES } from '../utils/config';

const Register: FC = () => {
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

  const handleChangeWithError = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setError({ isSet: error.isSet, msg: error.msg });
    handleChange(ev);
  };

  useEffect(() => {
    if (!(values.email && values.password && values.name)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values]);

  const setRegisterError = (err: Error): void => {
    setError({
      isSet: true,
      msg: err.message,
    });
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(authRegister(values, setRegisterError));
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
          error={error.isSet}
          errorText={error.msg}
          size={'default'}
          extraClass="mt-6"
        />
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
          onChange={handleChange}
          icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
          value={values.password}
          name={'password'}
          error={error.isSet}
          errorText={error.msg}
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
            <Link to={ROUTES.login} className={styles.accent}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
