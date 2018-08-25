import React from 'react';


class CoffeeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.coffeeItem && this.props.coffeeItem.name || '',
      roast: this.props.coffeeItem && this.props.coffeeItem.roast || '',
      coffee: this.props.coffeeItem && this.props.coffeeItem.coffee || '',
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.props.coffeeItem) {
      this.props.onComplete( {
        ...this.state,
        id: this.props.coffeeItem._id,
        editing: false
      })
    }
    else {
    this.props.onComplete(this.state);
    this.setState({ ...this.defaultState });
    }
  }

  
  render() {

    return (
      <React.Fragment>

      <form onSubmit={this.handleSubmit} >
        
        <label >NAME</label>

        <input required type="text" name='name' onChange={this.handleChange} value={this.state.name}/>

        <label >ROAST</label>

        <input required type="text" name='roast' onChange={this.handleChange} value={this.state.roast}/>

        <label >COFFEE ORIGIN</label>

        <input required type="text" name='coffee' onChange={this.handleChange} value={this.state.coffee}/>

        <input className='submitButton' type="submit"  value={this.props.buttonText}/>

      </form>
      </React.Fragment>
    );
  }
}


export default CoffeeForm;
