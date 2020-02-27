import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {

      let transformedIngredients = Object.keys(props.ingredients)
      .map(igkey => {
            return [...Array(props.ingredients[igkey])]
            .map((_, index) => {
                  return <BurgerIngredient key={igkey + index} type={igkey} />
            })
      }).reduce((prevarr, updatedel) => {
            return prevarr.concat(updatedel);
      }, []);

      if (transformedIngredients.length === 0) {
            transformedIngredients = "Please start adding ingredients";
      }

      return(
            <div className={classes.Burger}>
                  <BurgerIngredient type="bread-top" />
                        {transformedIngredients}
                  <BurgerIngredient type="bread-bottom" />
            </div>
      );
}

export default burger;