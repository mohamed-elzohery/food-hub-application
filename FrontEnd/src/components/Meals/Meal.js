import React, { useState } from "react";
import classes from "./Meal.module.css";
import MealImg from "./meal.jpg";
import { useDispatch } from "react-redux";
import { CartActions } from "../../slices/Cart-slice";

const Meal = (props) => {
  const [amount, setAmount] = useState(0);
  const { title, desc, id, price } = props;
  const dispatch = useDispatch();

  const onIncHandler = () => {
    setAmount(amount + 1);
  };

  const onDecHandler = () => {
    setAmount(amount - 1);
  };

  const onAddHandler = () => {
    dispatch(CartActions.addItem({ id, title, desc, amount, price }));
  };

  return (
    <div className={classes.meal}>
      <img src={MealImg} alt="meal" />
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
};

export default Meal;
