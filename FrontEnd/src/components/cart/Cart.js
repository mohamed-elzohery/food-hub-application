import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../UI/modal/Modal';
import classes from './Cart.module.css';
import { CartActions } from '../../slices/Cart-slice';
import { UIActions } from '../../slices/UI-slice';
import CartItem from './CartItem';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const cartTotalPrice = useSelector(state => state.cart.cartTotalPrice); 
    const dispatch = useDispatch();
    console.log(cartTotalPrice)

    const onCancelHandler = () => {
        dispatch(UIActions.closeCart());
    }


    const onCheckoutHandler = () => {
        dispatch(UIActions.closeCart());
    }

    return( 
    <div className={classes.checkout}>
        <h2>Cart</h2>
        {!cartItems.length && <p className={classes['no-item-txt']}>No items in cart</p>}
        <div className={classes['cart-items']}>
           {cartItems.map(meal => <CartItem key={meal.id} price={meal.price} title={meal.title} amount={meal.amount} id={meal.id}/>)}
        </div>
        <div className={classes['price-pane']}>
            <h4>Total Price:</h4>
            <p>{cartTotalPrice.toFixed(2)}LE</p>
        </div>
        {!!cartItems.length && <div className={classes['checkout-controls']}>
            <button className={classes.cancel} onClick={onCancelHandler}>Order</button>
            <button className={classes.order} onClick={onCheckoutHandler}>Cancel</button>
        </div>}
        
    </div>
    )
}

const Cart = () => {
    return <Modal><Checkout /></Modal>
}

export default Cart;