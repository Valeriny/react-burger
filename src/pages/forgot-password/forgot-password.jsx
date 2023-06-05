import styles from "./forgot-password.module.css";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from "../../utils/api";

function PasswordForgot() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onChangeForm = (e) => {
    const { value, name } = e.target;
    setEmail(value);
  };


  const handlerSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
    .then((res) => {
      localStorage.setItem("forgot-password", true); 
      navigate("/reset-password");
    })
    .catch((err) => {
      console.err(err);
    });
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
      <EmailInput
        placeholder={'Укажите e-mail'}
        onChange={onChangeForm}
        name={'email'}
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Восстановить
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль? 
        <Link to="/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default PasswordForgot;