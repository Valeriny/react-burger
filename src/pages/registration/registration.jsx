import styles from "./registration.module.css";
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { registerUser } from "../../services/actions/user";

function Registration() {

  const dispatch = useDispatch();
  const inputRefName = useRef(null);


  const [values, handleChange] = useState('');                  


  
  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  }
  
  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h2>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.name}
        name={'name'}
        error={false}
        ref={inputRefName}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass="mt-6 mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Зарегистрироваться
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default Registration;