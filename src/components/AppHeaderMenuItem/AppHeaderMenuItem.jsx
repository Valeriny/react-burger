import styles from "./AppHeaderMenuItem.module.css";

const AppHeaderMenuItem = (props) => {
  return (
    <li className={`${styles['app-header__menu-item']} pt-4 pb-4 pl-5 pr-5 text text_type_main-default`}>
      {props.children}
      <p className={`ml-2`}>{props.text}</p>
    </li>
  );
};

export default AppHeaderMenuItem;
