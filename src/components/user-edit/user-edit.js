import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from '../../hooks/useForm';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-edit.module.css';

const UserEdit = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isShowButtons, setIsShowButtons] = useState(false);

  const initialFormState = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',
    }),
    [],
  );

  const { values, handleChange, setValues } = useForm(initialFormState);

  const onResetChanges = () => {
    setValues(initialFormState);
  };

  useEffect(() => {
    const { name, email, password } = values;
    const { name: initName, email: initEmail, password: initPassword } = initialFormState;

    if (name !== initName || email !== initEmail || password !== initPassword) {
      setIsShowButtons(true);
    } else {
      setIsShowButtons(false);
    }
  }, [values, initialFormState]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(values);
    // dispatch(handleLogin(formValue.email, formValue.password));
    // navigate('/', {replace: true});
  };

  return (
    <div className={styles.root}>
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
        {isShowButtons && (
          <div className={styles.formFooter}>
            <Button onClick={onResetChanges} htmlType="button" type="secondary" size="medium" extraClass="mt-6 mb-20">
              Отменить
            </Button>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserEdit;
