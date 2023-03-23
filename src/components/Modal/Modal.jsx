import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

const Modal = (props) => {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        props.CloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <button
          className={`${styles["modal__btn-close"]}`}
          onClick={props.CloseModal}
        >
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay CloseModal={props.CloseModal} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  CloseModal: PropTypes.func.isRequired,
};
export default Modal;
