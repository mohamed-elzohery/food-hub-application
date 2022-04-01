import React from 'react';
import classes from './Meal.module.css';
import MealImg from './meal.jpg'

const Meal = () => {
    return <div className={classes.meal}>
        <img src={MealImg} alt='meal'/>
        <div className={classes.textbox}>
            <h3>Meal Title</h3>
            <p>This is a very delicious meal you find it in this store we get it for you hot and fresh order it now.</p>
        </div>
        <div className={classes.counter}>
            <input disabled type='number' value='0'/>
            <div className={classes.controls}>
                <button>-</button>
                <button>+</button>
            </div>
            <button className={classes.orderbtn}>Add To Cart</button>
        </div>
    </div>
}

export default Meal;