import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import Backdrop from "../backdrop/Backdrop";
import { UIActions } from "../../slices/UI-slice";
import classes from "./Modal.module.css";
const overlay = document.getElementById("overlay");

const ModalContent = (props) => {
  return <div className={classes["modal-body"]}>{props.children}</div>;
};

const Modal = (props) => {
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(UIActions.closeCart());
  };

  return (
    <>
      <Backdrop onClickHandler={closeCart} />
      {createPortal(<ModalContent>{props.children}</ModalContent>, overlay)}
    </>
  );
};

export default Modal;
