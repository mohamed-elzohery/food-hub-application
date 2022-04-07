import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../UI/modal/Modal";
import classes from "./Cart.module.css";
import { CartActions } from "../../slices/Cart-slice";
import { UIActions } from "../../slices/UI-slice";
import CartItem from "./CartItem";
import useInput from "../../hooks/use-input";
import { validateName } from "../SignUpForm";
import FormGroup from "../FormGroup";

const validatePhone = (val) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  let phone = val.toString().trim();
  if (phone === "") return { isValid: false, msg: "Phone is required" };
  if (!phone.match(phoneRegex))
    return { isValid: false, msg: "Phone is not valid" };
  return { isValid: true };
};

const validateAddress = (val) => {
  let phone = val.toString().trim();
  if (phone === "") return { isValid: false, msg: "Address is required" };
  return { isValid: true };
};

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalPrice = useSelector((state) => state.cart.cartTotalPrice);
  const dispatch = useDispatch();

  const onCancelHandler = () => {
    dispatch(UIActions.closeCart());
  };

  const onCheckoutHandler = () => {
    dispatch(UIActions.openOrder());
  };

  return (
    <div className={classes.checkout}>
      <h2>Cart</h2>
      {!cartItems.length && (
        <p className={classes["no-item-txt"]}>No items in cart</p>
      )}
      <div className={classes["cart-items"]}>
        {cartItems.map((meal) => (
          <CartItem
            key={meal.id}
            price={meal.price}
            title={meal.title}
            amount={meal.amount}
            id={meal.id}
            photo={meal.photo}
          />
        ))}
      </div>
      <div className={classes["price-pane"]}>
        <h4>Total Price:</h4>
        <p>{cartTotalPrice.toFixed(2)}LE</p>
      </div>
      {!!cartItems.length && (
        <div className={classes["checkout-controls"]}>
          <button className={classes.cancel} onClick={onCheckoutHandler}>
            Next
          </button>
          <button className={classes.order} onClick={onCancelHandler}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const OrderForm = () => {
  const dispatch = useDispatch();
  const {
    enteredValue: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    msg: nameErrMsg,
    isValid: isNameValid,
    resetHandler: resetNameHandler,
  } = useInput(validateName);

  const {
    enteredValue: enteredPhone,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    msg: phoneErrMsg,
    isValid: isPhoneValid,
    resetHandler: resetpPhoneHandler,
  } = useInput(validatePhone);

  const {
    enteredValue: enteredAddress,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    msg: addressErrMsg,
    isValid: isAddressValid,
    resetHandler: resetAddressHandler,
  } = useInput(validateAddress);

  const onBackHandler = () => {
    dispatch(UIActions.closeOrder());
  };

  const onSumbitHandler = (e) => {
    e.preventDefault();
    //Post request
  };

  return (
    <div className={classes["order-section"]}>
      <h2>Order</h2>
      <form className={classes["order-form"]}>
        <FormGroup
          type="name"
          name="name"
          valueChangedHandler={nameChangeHandler}
          inputBlurHandler={nameBlurHandler}
          enteredValue={enteredName}
          inputHasError={nameInputHasError}
          errMsg={nameErrMsg}
        />

        <FormGroup
          type="Phone"
          name="Phone"
          valueChangedHandler={phoneChangeHandler}
          inputBlurHandler={phoneBlurHandler}
          enteredValue={enteredPhone}
          inputHasError={phoneInputHasError}
          errMsg={phoneErrMsg}
        />

        <FormGroup
          type="address"
          name="address"
          valueChangedHandler={addressChangeHandler}
          inputBlurHandler={addressBlurHandler}
          enteredValue={enteredAddress}
          inputHasError={addressInputHasError}
          errMsg={addressErrMsg}
          placeholder="Ex: City, Street, Home NO."
        />
        <div className={classes["form-control"]}>
          <button
            className={`${classes.cancel} ${
              isAddressValid && isPhoneValid && isNameValid
                ? ""
                : classes.disabled
            }`}
            onClick={onSumbitHandler}
          >
            Order
          </button>
          <button className={classes.order} onClick={onBackHandler}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

const Cart = () => {
  const isOrderOpen = useSelector((state) => state.UI.isOrderOpen);
  console.log(isOrderOpen);
  return <Modal>{isOrderOpen ? <OrderForm /> : <Checkout />}</Modal>;
};

export default Cart;
