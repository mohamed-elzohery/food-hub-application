import React from 'react';
import Meal from './Meal';
import classes from './Meals.module.css';

const Meals = () => {
    return <section className={classes.meals}>
        <h2>Meals</h2>
        <Meal />
        <Meal />
    </section>;
}

export default Meals;