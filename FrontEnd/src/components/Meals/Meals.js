<<<<<<< HEAD
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import Meal from './Meal';
import classes from './Meals.module.css';

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef();

    const myCallBack = useCallback(node => {
        if(!isFinished) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
           if(entries[0].isIntersecting){
               if(hasMore){
                setPageNumber(prev => prev + 1);
               }
           } 
        });
        if(node) observer.current.observe(node);
    }, [isFinished, hasMore]);

    useEffect(() => {
        const allMeals = axios.get(`http://localhost:8000/api/v1/meals?limit=5&page=${pageNumber}`);
        allMeals.then(data => {
            console.log(data)
            if(data.data.success){
                setMeals(prev => prev.concat(data.data.data));
                if(data.data.pagination.next){
                    setHasMore(true);
                }
            }else{
                setMeals([]);
            }
            setIsFinished(true);
        }).catch(err => console.log);
    }, [setMeals, pageNumber]);

    const loadMoreData = () => {

    }

    
    return <section className={classes.meals}>
        <h2>Meals</h2>
        {meals.length ===0 && !isFinished ? <Spinner /> : null}
        {meals.length === 0 && isFinished ? "Server Error" : null}
        {meals.length !== 0 && isFinished ? meals.map((meal, index) => <Meal key={meal._id} title={meal.title} desc={meal.desc} id={meal._id} price={meal.price} photo={meal.photo} ref={index + 1 === meals.length ? myCallBack : null}/>): null}
    </section>;
}
=======
import React from "react";
import Meal from "./Meal";
import classes from "./Meals.module.css";

const Meals = () => {
  const allMeals = [
    {
      id: 1,
      title: "Pizza And Burger",
      desc: "Delicious fast food served with pepsi or Coca-Cola.",
      price: 12,
    },
    {
      id: 2,
      title: "Fruit Salad",
      desc: "Tasty fruit salad consists of many ingredients, Bananas, Strewberry and Apples.",
      price: 22.88343,
    },
  ];
  return (
    <section className={classes.meals}>
      <h2>Meals</h2>
      {allMeals.map((meal) => (
        <Meal
          key={meal.id}
          title={meal.title}
          desc={meal.desc}
          id={meal.id}
          price={meal.price}
        />
      ))}
    </section>
  );
};
>>>>>>> 35ed38e990059c64967e7dbdb638b2902ee7b774

export default Meals;
