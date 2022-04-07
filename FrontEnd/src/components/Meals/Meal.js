import React, { useState, forwardRef } from "react";
import classes from "./Meal.module.css";
import { useDispatch } from "react-redux";
import { CartActions } from "../../slices/Cart-slice";
import { UIActions } from "../../slices/UI-slice";

const Meal = forwardRef((props, ref) => {
  const [amount, setAmount] = useState(0);
  const { title, desc, id, price, photo } = props;
  const dispatch = useDispatch();

  const onIncHandler = () => {
    setAmount(amount + 1);
  };

  const onDecHandler = () => {
    setAmount(amount - 1);
  };

  const onAddHandler = () => {
    const notificationId = Date.now();
    dispatch(CartActions.addItem({ id, title, desc, amount, price, photo }));
    dispatch(
      UIActions.addNotification({
        msg: `${title} is added to cart.`,
        id: notificationId,
      })
    );
    setTimeout(
      () => dispatch(UIActions.removeNotification({ id: notificationId })),
      3000
    );
  };

  return (
    <div className={classes.meal} ref={ref}>
      <img src={`http://localhost:8000/${photo}`} alt="meal" />
      <div className={classes.textbox}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <p className={classes.price}>
          Price: <span>{`${price.toFixed(2)}`}</span> LE
        </p>
      </div>
      <div className={classes.counter}>
        <input
          className={!amount ? classes.reset : ""}
          disabled
          type="number"
          value={amount}
        />
        <div className={classes.controls}>
          <button
            onClick={onDecHandler}
            disabled={!amount}
            className={`${!amount ? classes.disabled : ""}`}
          >
            -
          </button>
          <button onClick={onIncHandler}>+</button>
        </div>
        <button
          className={`${classes.orderbtn} ${!amount ? classes.disabled : ""}`}
          onClick={onAddHandler}
          disabled={!amount}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
});

export default Meal;
