import React, { FC, useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { useDispatch } from '../hooks';
import { forgotPassword } from '../services/actions/auth';
import { ROUTES } from '../utils/config';

const ForgotPassword: FC = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(forgotPassword(values.email) as any).then(() => {
      navigate(ROUTES.resetPassword, { replace: true, state: { from: ROUTES.forgotPassword } });
    });
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          size={'default'}
          extraClass="mt-6"
        />
        <div className={styles.formFooter}>
          <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
            Восстановить
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

export default ForgotPassword;
