import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }
   handleNameChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
   }
  handleIngredientChange = (event) => {
    console.log(event.target.name)
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, event.target.name]})
  }

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      ...this.state,
      id: Date.now()
    }
    this.props.addOrder(newOrder)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className="ingredient-buttons"key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        {!this.state.name || this.state.ingredients <= 1 ? <h4>Please enter a name and select at least one ingredient for your burrito!</h4> : <button className='submit-button' onClick={(e) => this.handleSubmit(e)}>Submit Order</button>}
      </form>
    )
  }
}

export default OrderForm;
