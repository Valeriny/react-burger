import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from 'react-router-dom';
import AppHeaderMenuItem from "../AppHeaderMenuItem/AppHeaderMenuItem";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  const location = useLocation();
  
  return (
    <header
      className={`${styles["app-header"]} text text_type_main-default pt-3 pb-3`}
    >
      <nav>
        <ul className={`${styles["app-header__nav"]} pt-4 pb-4`}>
        <NavLink end to="/" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
          <AppHeaderMenuItem
            isActive={true}
            text="Конструктор"
            icon={<BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} className={`${styles["app-header__icon"]}`}/>}
          ></AppHeaderMenuItem>
          </NavLink>
          <AppHeaderMenuItem
            isActive={false}
            text="Лента заказов"
            className="text text_type_main-default text_color_inactive"
            icon={<ListIcon type="secondary" className={`${styles["app-header__icon"]}`}/>}
          ></AppHeaderMenuItem>
          <li className={`${styles["app-header__logo"]}`}>
            <Logo />
          </li>
          <NavLink to="/profile" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
          <AppHeaderMenuItem
            isActive={false}
            text="Личный кабинет"
            icon={<ProfileIcon type={location.pathname.includes("/profile") ? "primary" : "secondary"} className={`${styles["app-header__icon"]}`}/>}
          ></AppHeaderMenuItem>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
