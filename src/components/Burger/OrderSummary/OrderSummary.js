import React from 'react';
import Aux from '../../../hoc/Auxiliry';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
      const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                  return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
            });

      return (  
            <Aux>
                  <h3>Your order</h3>
                  <p>Ingredients</p>
                  <ul>
                        {ingredientSummary}
                  </ul>
                  <p>Total price: {props.totalPrice.toFixed(2)}$</p>
                  <p>Continue to checkout?</p>
                  <Button btnType="Danger" clicked={props.orderCancel}>CANCEL</Button>
                  <Button btnType="Success" clicked={props.orderContinue}>CONTINUE</Button>
            </Aux>
      )
}

export default orderSummary;