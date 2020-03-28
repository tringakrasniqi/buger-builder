import React, { Component } from "react";
import Aux from "../../hoc/Auxiliry";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
            totalPrice: 4,
            purchaseable: false,
            purchasing: false
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
            this.updatePruchaseState(updatedIngredients);
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
            this.updatePruchaseState(updatedIngredients);
      }

      updatePruchaseState = (ingredientsList) => {
            const ingredients = {
                  ...ingredientsList
            };
            const sum = Object.keys(ingredients).map(key => {
                  return ingredients[key];
            }).reduce((sum, element) => {
                  return sum + element;
            }, 0);
            this.setState({purchaseable: sum > 0});
      }

      purchaseHandler = () => {
            this.setState({purchasing : true});
      }

      purchaseCancelHandler = () => {
            this.setState({purchasing : false})
      }

      purchaseContinueHandler = () => {
            alert('continue');
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
                        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                              <OrderSummary ingredients={this.state.ingredients}
                                    orderCancel={this.purchaseCancelHandler}
                                    orderContinue={this.purchaseContinueHandler}
                                    totalPrice={this.state.totalPrice}></OrderSummary>      
                        </Modal>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls 
                              disabled={disabledInfo}
                              ingredientAdded={this.addIngredientHandler} 
                              ingredientRemoved={this.removeIngredientHandler}
                              totalPrice={this.state.totalPrice}
                              ordered={this.purchaseHandler}
                              purchaseable={this.state.purchaseable}/>
                  </Aux>
            );
      }

}

export default BurgerBuilder;