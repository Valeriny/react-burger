import { useDispatch } from "react-redux";
import styles from "./profile.module.css";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { userLogin } from "../../services/actions/user";

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(userLogin());
    navigate('/login');
  }

  return (
    <div className={styles.content}>
      <div className={styles.navigation}>
        <ul className={`text text_type_main-medium ${styles.list}`}>
          <li className={styles.element}>
            <NavLink end to="/profile" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              Профиль
            </NavLink>
          </li>
          <li className={styles.element}>
            <NavLink to="/profile/orders" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              История заказов
            </NavLink>
          </li>
          <li className={styles.element}>
            <button onClick={handlerLogout} className={`${styles.button} text text_type_main-medium`}>
              Выход
            </button>
          </li>
        </ul>
        <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet/>
    </div>
  )
}

export default Profile;