import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from "../../services/actions/user";
  
  function Login() {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');                  
  
      const onChangeEmail = (e) => {
        setEmail(e.target.value);
      };
      const onChangePassword = (e) => {
        setPassword(e.target.value);
      };
      
      const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
        navigate("/");
      }  
    
      return (
        <form className={styles.content} onSubmit={handlerSubmit}>
          <h2 className={`text text_type_main-medium ${styles.title}`}>Вход</h2>
          <EmailInput
            onChange={onChangeEmail}
            name={'email'}
            isIcon={false}
            extraClass="mt-6"
          />
          <PasswordInput
            onChange={onChangePassword}
            name={'password'}
            extraClass="mt-6 mb-6"
          />
          <Button 
            htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
              Войти
          </Button>
          <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
            Вы - новый пользователь? 
            <Link to="/register" className={styles.link}> Зарегистрироваться</Link>
          </p>
          <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
            Забыли пароль? 
            <Link to="/forgot-password" className={styles.link}> Восстановить пароль</Link>
          </p>
        </form>
      )
    }
  
  export default Login;




  





  
  