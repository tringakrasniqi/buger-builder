import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
      const controls = [
            { label: 'Salad', type: 'salad'},
            { label: 'Cheese', type: 'cheese'},
            { label: 'Meat', type: 'meat'},
            { label: 'Bacon', type: 'bacon'}
      ];

      return (
            <div className={classes.BuildControls}>
                  <p>Burger Price: <strong>{props.totalPrice.toFixed(2)}$</strong> </p>
                  { controls.map(control => {
                        return <BuildControl 
                              key={control.label} 
                              label={control.label} 
                              added={() => props.ingredientAdded(control.type)}
                              removed={() => props.ingredientRemoved(control.type)}
                              disabled={props.disabled[control.type]}/>
                  })}
            </div>
      );
}

export default buildControls;