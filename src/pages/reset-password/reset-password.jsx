import styles from "./reset-password.module.css";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { setNewPassword } from "../../utils/api";


function PasswordReset() {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmCode, setConfirmCode] = useState("");

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmCode = (e) => {
    setConfirmCode(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setNewPassword(password, confirmCode);
    localStorage.removeItem("forgot-password", true); 
    navigate("/login");
  }

  if (!localStorage.getItem("forgot-password")) { 
    navigate("/forgot-password");
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
      <PasswordInput
        placeholder={"Введите новый пароль"}
        onChange={onChangePassword}
        name={'password'}
        extraClass="mt-6 mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={onChangeConfirmCode}
        name={'code'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Сохранить
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль? 
        <Link to="/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default PasswordReset;