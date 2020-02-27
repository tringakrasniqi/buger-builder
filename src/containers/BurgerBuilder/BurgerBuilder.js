import React, { Component } from "react";
import Aux from "../../hoc/Auxiliry";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildContols/BuildControls";

const INGREDIENT_PRICES = {
      salad: 0.5,
      cheese: 0.4,
      meat: 1.3,
      bacon: 0.7
}

class BurgerBuilder extends Component {

      state = {
            ingredients: {
                  meat: 0, 
                  salad: 0, 
                  cheese: 0, 
                  bacon: 0
            },
            totalPrice: 4
      }

      addIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount+1;
            const updatedIngredients = {
                  ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[type] + this.state.totalPrice;
            this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
      }

      removeIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            if(oldCount <= 0) {
                  return;
            }
            const updatedCount = oldCount-1;
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients : updatedIngredients, totalPrice: priceDeduction});
      }

      render() {
            const disabledInfo = {
                  ...this.state.ingredients
            };

            for (let key in disabledInfo) {
                  disabledInfo[key] = disabledInfo[key] <= 0;
            }

            return (
                  <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                              disabled={disabledInfo}
                              ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}
                              totalPrice={this.state.totalPrice}/>
                  </Aux>
            );
      }

}

export default BurgerBuilder;