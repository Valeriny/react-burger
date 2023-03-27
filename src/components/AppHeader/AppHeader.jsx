import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderMenuItem from "../AppHeaderMenuItem/AppHeaderMenuItem";

import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header
      className={`${styles["app-header"]} text text_type_main-default pt-3 pb-3`}
    >
      <nav>
        <ul className={`${styles["app-header__nav"]} pt-4 pb-4`}>
          <AppHeaderMenuItem
            isActive={true}
            text="Конструктор"
            icon={<BurgerIcon type="primary" className={`${styles["app-header__icon"]}`}/>}
          ></AppHeaderMenuItem>
          <AppHeaderMenuItem
            isActive={false}
            text="Лента заказов"
            className="text text_type_main-default text_color_inactive"
            icon={<ListIcon type="secondary" className={`${styles["app-header__icon"]}`}/>}
          ></AppHeaderMenuItem>
          <li className={`${styles["app-header__logo"]}`}>
            <Logo />
          </li>
          <AppHeaderMenuItem
            isActive={false}
            text="Личный кабинет"
            icon={<ProfileIcon type="secondary" className={`${styles["app-header__icon"]}`}/>}
          ></AppHeaderMenuItem>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
