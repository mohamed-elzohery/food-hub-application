import React from 'react';
import Meal from './Meal';
import classes from './Meals.module.css';

const Meals = () => {
    const allMeals = [{
        id: 1,
        title: 'Pizza And Burger',
        desc: 'Delicious fast food served with pepsi or Coca-Cola.',
        price: 12
    },
    {
        id: 2,
        title: 'Fruit Salad',
        desc: 'Tasty fruit salad consists of many ingredients, Bananas, Strewberry and Apples.',
        price: 22.88343
    }
]
    return <section className={classes.meals}>
        <h2>Meals</h2>
        {allMeals.map(meal => <Meal key={meal.id} title={meal.title} desc={meal.desc} id={meal.id} price={meal.price}/>)}
    </section>;
}

export default Meals;