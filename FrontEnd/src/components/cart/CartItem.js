import React from 'react';
import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { CartActions } from '../../slices/Cart-slice';

const CartItem = (props) => {
    const dispatch = useDispatch();

    const {id, amount, price, title, photo} = props;

    const onIncreaseHandler = () => {
        dispatch(CartActions.addItem({id, amount : 1, price}));
    }

    const onDecreaseHandler = () => {
        dispatch(CartActions.removeItem({id, amount : 1, price}));
    }
    
    return  <div className={classes['cart-item']}>
    <div className={classes['cart-item__details']}>
        <div className={classes['cart-item__info']}>
            <h3>{title}</h3>
            <p>{price.toFixed(2) * amount}LE</p>
        </div>
        <div className={classes['cart-item__control']}>
            <button onClick={onDecreaseHandler}>-</button>
            <input value={amount} disabled/>
            <button onClick={onIncreaseHandler}>+</button>
        </div>
    </div>
    <div className={classes['cart-img__container']}>
        <img src={`http://localhost:8000/${photo}`} alt='meal photo'/>
    </div>
</div>
}

export default CartItem;