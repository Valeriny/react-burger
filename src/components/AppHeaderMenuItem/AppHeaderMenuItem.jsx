import styles from "./AppHeaderMenuItem.module.css";
import PropTypes from "prop-types";

const AppHeaderMenuItem = (props) => {
  return (
    <li className={`text text_type_main-default`}>
      <a href="#" className={`${styles["app-header__item"]} `}>
        {props.image}
        <span
          className={`${styles["app-header__item-text"]} ${
            !props.isActive ? "text_color_inactive" : ""
          }`}
        >
          {props.text}
        </span>
      </a>
    </li>
  );
};

AppHeaderMenuItem.propTypes = {
  isActive: PropTypes.bool,
  text: PropTypes.string,
};

export default AppHeaderMenuItem;
