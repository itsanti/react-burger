import React, { FC, useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-edit.module.css';
import { useDispatch, useSelector } from '../../hooks';
import { selectUser } from '../../services/selectors/auth';
import { editUser } from '../../services/actions/auth';
import { EditPayload } from '../../services/actions/auth';


const UserEdit: FC = () => {
  const [isNotEdit, setIsNotEdit] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isShowButtons, setIsShowButtons] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { values, handleChange, setValues } = useForm(user);

  const onResetChanges = () => {
    setValues(user);
    setIsNotEdit(true);
  };

  const onIconClick = (ev: React.MouseEvent<HTMLElement>, name?: string) => {
    if (!isNotEdit && name === 'password') {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      setIsNotEdit(!isNotEdit);
    }
  };

  useEffect(() => {

    const { name, email, password } = values;
    const { name: initName, email: initEmail, password: initPassword } = user;

    if (name !== initName || email !== initEmail || password !== initPassword) {
      setIsShowButtons(true);
    } else {
      setIsShowButtons(false);
    }
  }, [values, user]);

  useEffect(() => {
    if (!(values.name && values.email)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const patch: EditPayload = {};
    if (values.name !== user.name) {
      patch.name = values.name;
    }
    if (values.email !== user.email) {
      patch.email = values.email;
    }
    if (values.password !== user.password) {
      patch.password = values.password;
    }
    dispatch(editUser(patch));
    setIsNotEdit(true);
    setIsShowButtons(false);
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
          icon={'EditIcon'}
          onIconClick={onIconClick}
          readOnly={isNotEdit}
          disabled={isNotEdit}
        />
        <Input
          placeholder={'E-mail'}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          error={false}
          size={'default'}
          extraClass="mt-6"
          icon={'EditIcon'}
          onIconClick={onIconClick}
          readOnly={isNotEdit}
          disabled={isNotEdit}
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={!isNotEdit ? (isPasswordVisible ? 'HideIcon' : 'ShowIcon') : 'EditIcon'}
          value={values.password || ''}
          name={'password'}
          error={false}
          onIconClick={(ev) => onIconClick(ev, 'password')}
          size={'default'}
          extraClass="mt-6"
          readOnly={isNotEdit}
          disabled={isNotEdit}
        />
        {isShowButtons && (
          <div className={styles.formFooter}>
            <Button onClick={onResetChanges} htmlType="button" type="secondary" size="medium" extraClass="mt-6 mb-20">
              Отменить
            </Button>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={isButtonDisabled}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserEdit;
