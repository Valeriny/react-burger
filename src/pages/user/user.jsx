import styles from "./user.module.css";
import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser, getUser } from "../../services/actions/user";
import Modal from "../../components/Modal/Modal";



function UserInfo() {
  const {success} = useSelector(store => store.user);

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const background = params.id && location.state && location.state.background;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  
  const [isModalOpen, setIsModalOpen] = useState(background || false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerCancel = () => {
    setName(''); 
    setEmail('');
    setPassword('');
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser(email, name, password));
    if(success) {
      openModal();
    }
  }

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    inputRef.current.disabled = false;
    inputRef.current.classList.remove('input__textfield-disabled');
  }

  const onBlur = () => {
    inputRef.current.disabled = true;
    inputRef.current.classList.add('input__textfield-disabled');
  }

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <Input
          onChange={onChangeName}
          name={'name'}
          error={false}
          errorText={"Ошибка"}
          placeholder={'Имя'}
          icon={'EditIcon'}
          onIconClick={onIconClick}
          ref={inputRef}
          disabled={true}
          onBlur={onBlur}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          name={'email'}
          isIcon={true}
          placeholder='Логин'
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          name={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
        />
        <div className={styles.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={handlerCancel}>Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>
      </form>

      <div>
        {isModalOpen && 
          <Modal onClosePopup={closeModal}>
            <div className={styles.container}>
              {success 
              ? <p className="text text_type_main-medium">Ваши данные успешно изменены</p> 
              : <p className="text text_type_main-medium">Произошла ошибка. Попробуйте снова</p>}
            </div>
          </Modal>
        }
      </div>
    </>
      
  )
}

export default UserInfo;




